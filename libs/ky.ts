import ky from 'ky';
import useAuthStore from '../store/auth/auth';
import { BASE_URL } from '@env';

const baseclient = ky.extend({
  prefixUrl: BASE_URL,
  timeout: 60000,
  retry: 3,
});

const http = baseclient.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = useAuthStore.getState().token;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          useAuthStore.getState().clearToken();
        }
        return response;
      },
    ],
  },
});

export default baseclient;

export { http };
