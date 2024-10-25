import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('accessToken');
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('refreshToken');
};

export const setAccessToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('accessToken', token);
};

export const setRefreshToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('refreshToken', token);
};

export const clearTokens = async (): Promise<void> => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};
