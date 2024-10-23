import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  status: 'authenticated' | 'unauthenticated';
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  status: 'unauthenticated',
  setToken: async (token: string) => {
    await AsyncStorage.setItem('token', token);

    set({ token, status: 'authenticated' });
  },
  clearToken: () => set({ token: null, status: 'unauthenticated' }),
}));

export default useAuthStore;
