import ky, { NormalizedOptions } from 'ky';
import { BASE_URL } from '@env';
import { getAccessToken } from '../store/token/token-manager';

interface QueuePromise {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false; // Flag to prevent multiple refresh attempts
let failedQueue: QueuePromise[] = []; // Queue to hold failed requests during token refresh

// Function to process the queue after refresh
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const baseclient = ky.create({
  prefixUrl: BASE_URL,
  timeout: 60000,
  retry: 3,
});

const http = baseclient.extend({
  hooks: {
    beforeRequest: [
      async (request: Request) => {
        const token = await getAccessToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (
        request: Request,
        options: NormalizedOptions,
        response: Response
      ) => {
        if (response.status === 401) {
          const originalRequest = request.clone();

          if (!isRefreshing) {
            isRefreshing = true;

            // Dynamically import useAuthStore and ensure it's typed correctly
            const { default: useAuthStore } = await import(
              '../store/auth/auth'
            );
            try {
              // Attempt to refresh the access token
              await useAuthStore.getState().refreshTokenFlow();
              const newToken = useAuthStore.getState().accessToken;

              if (newToken) {
                // Add the new token to the original request
                request.headers.set('Authorization', `Bearer ${newToken}`);
                processQueue(null, newToken);

                // Retry the original request with the new token
                return baseclient(originalRequest);
              } else {
                throw new Error('Token refresh failed');
              }
            } catch (error) {
              processQueue(error, null);

              await useAuthStore.getState().clearTokens(); // Clear tokens on failure
              return response; // Return the original 401 response
            } finally {
              isRefreshing = false;
            }
          }

          // Queue the requests while the token is being refreshed
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
        }

        return response;
      },
    ],
  },
});

export default baseclient;
export { http };
