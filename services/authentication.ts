import { http } from '../libs/ky';
import { SignInFormSchema } from '../modules/authentication/types/sign-in';
import { SignUpFormSchema } from '../modules/authentication/types/sign-up';
import useAuthStore from '../store/auth/auth';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens as clearTokenManager,
} from '../store/token/token-manager';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// Helper function to set both access and refresh tokens in Zustand and AsyncStorage via token-manager
async function setTokens(accessToken: string, refreshToken: string) {
  await setAccessToken(accessToken); // Use token-manager for persistence
  await setRefreshToken(refreshToken);
  useAuthStore.getState().setAccessToken(accessToken); // Set in Zustand
  useAuthStore.getState().setRefreshToken(refreshToken);
}

// Helper function to clear both access and refresh tokens via token-manager
async function clearTokens() {
  await clearTokenManager(); // Use token-manager for clearing tokens
  useAuthStore.getState().clearTokens();
}

// Login function
async function loginUser({ email, password }: SignInFormSchema) {
  try {
    const response: LoginResponse = await http
      .post('auth/login', {
        json: { email, password },
      })
      .json();

    if (response) {
      await setTokens(response.access_token, response.refresh_token); // Set both tokens after successful login

      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'You have logged in successfully',
        },
      });

      router.replace('/home');
    }
  } catch (error: unknown) {
    Toast.show({
      type: 'error',
      props: {
        title: 'Error',
        description: `${error}`,
      },
    });
  }
}

// Fetch protected data
async function getProtectedData() {
  const token = await getAccessToken(); // Get the access token from token-manager

  if (!token) {
    throw new Error('User is not authenticated. No token available.');
  }

  const data = await http
    .get('auth/protected/route', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();

  return data;
}

// Sign-up function
async function signUpUser({ username, email, password }: SignUpFormSchema) {
  try {
    const response: LoginResponse = await http
      .post('auth/signup', {
        json: { username, email, password },
      })
      .json();

    if (response) {
      await setTokens(response.access_token, response.refresh_token); // Set both tokens after successful signup

      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'You have registered successfully',
        },
      });

      router.replace('/home');
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      props: {
        title: 'Error',
        description: `${error}`,
      },
    });
  }
}

// Logout function
async function logOutUser() {
  try {
    await clearTokens(); // Clear both access and refresh tokens via token-manager

    const accessTokenInStorage = await getAccessToken();
    const refreshTokenInStorage = await getRefreshToken();

    if (accessTokenInStorage === null && refreshTokenInStorage === null) {
      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Successfully logged out',
        },
      });
      router.replace('/login');
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      props: {
        title: 'Error',
        description: `${error}`,
      },
    });
  }
}

export const AuthService = {
  loginUser,
  getProtectedData,
  signUpUser,
  logOutUser,
};
