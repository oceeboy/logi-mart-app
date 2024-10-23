import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../libs/ky';
import { SignInFormSchema } from '../modules/authentication/types/sign-in';
import { SignUpFormSchema } from '../modules/authentication/types/sign-up';
import useAuthStore from '../store/auth/auth';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface LoginResponse {
  access_token: string;
}

// Helper function to set the token in Zustand and AsyncStorage
async function setToken(token: string) {
  useAuthStore.getState().setToken(token);
  await AsyncStorage.setItem('token', token);
}

// Helper function to clear the token from Zustand and AsyncStorage
async function clearToken() {
  useAuthStore.getState().clearToken();
  await AsyncStorage.removeItem('token');
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
      await setToken(response.access_token); // Set token after successful sign-up

      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'You have login successfully',
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
  const token = useAuthStore.getState().token;

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
      await setToken(response.access_token); // Set token after successful sign-up

      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'You have registerd successfully',
        },
      });

      router.replace('/home');
    }

    // Adding a Toast here to should that user is in.
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
    await clearToken(); // Clear token from Zustand and AsyncStorage

    const tokenInStorage = await AsyncStorage.getItem('token');

    if (tokenInStorage === null) {
      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Successfully logout',
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
