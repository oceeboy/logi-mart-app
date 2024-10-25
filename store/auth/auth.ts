import { create } from 'zustand';
import {
  clearTokens as clearTokenManager,
  getAccessToken,
  getRefreshToken,
  setAccessToken as persistAccessToken,
  setRefreshToken as persistRefreshToken,
} from '../token/token-manager';
import { http } from '../../libs/ky';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  status: 'authenticated' | 'unauthenticated';
  setAccessToken: (token: string) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  refreshTokenFlow: () => Promise<void>;
  clearTokens: () => Promise<void>;
  rehydrateAuthState: () => Promise<void>;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  status: 'unauthenticated',

  // Set the access token in both Zustand state and AsyncStorage (token-manager)
  setAccessToken: async (token: string) => {
    await persistAccessToken(token); // Persist using token-manager
    set({ accessToken: token, status: 'authenticated' });
  },

  // Set the refresh token in both Zustand state and AsyncStorage (token-manager)
  setRefreshToken: async (token: string) => {
    await persistRefreshToken(token); // Persist using token-manager
    set({ refreshToken: token });
  },

  // Refresh token flow to get a new access token
  refreshTokenFlow: async () => {
    const storedRefreshToken = await getRefreshToken(); // Get refresh token from token-manager
    if (!storedRefreshToken) {
      await useAuthStore.getState().clearTokens();
      return;
    }

    const response = await http.post('/refresh-token', {
      json: { refreshToken: storedRefreshToken },
    });

    if (!response.ok) {
      await useAuthStore.getState().clearTokens();
      return;
    }

    const { accessToken, refreshToken }: TokenResponse = await response.json();

    // Set and persist the new tokens
    if (accessToken) {
      await useAuthStore.getState().setAccessToken(accessToken); // Set in Zustand and persist
    }

    if (refreshToken) {
      await useAuthStore.getState().setRefreshToken(refreshToken); // Set in Zustand and persist
    }
  },

  // Rehydrate the authentication state when the app starts
  rehydrateAuthState: async () => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, status: 'authenticated' });
    } else {
      set({ accessToken: null, refreshToken: null, status: 'unauthenticated' });
    }
  },

  // Clear both the tokens in Zustand and AsyncStorage (token-manager)
  clearTokens: async () => {
    await clearTokenManager(); // Use token-manager to clear tokens
    set({ accessToken: null, refreshToken: null, status: 'unauthenticated' });
  },
}));

export default useAuthStore;
