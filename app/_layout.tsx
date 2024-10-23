import React, { useEffect } from 'react';
import { router, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../libs/toast-config';
import useAuthStore from '../store/auth/auth';
import { Poppins } from '../constants/fonts';

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [fontLoaded, fontLoadError] = useFonts({
    'Poppins-Black': Poppins.poppinsblack,
    'Poppins-Bold': Poppins.poppinsbold,
    'Poppins-ExtraBold': Poppins.poppinsextrabold,
    'Poppins-ExtraLight': Poppins.poppinsextralight,
    'Poppins-Light': Poppins.poppinslight,
    'Poppins-Medium': Poppins.poppinsmedium,
    'Poppins-Regular': Poppins.poppinsregular,
    'Poppins-SemiBold': Poppins.poppinssemibold,
    'Poppins-Thin': Poppins.poppinsthin,
  });

  useEffect(() => {
    if (fontLoaded || fontLoadError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontLoadError]);

  if (!fontLoaded && !fontLoadError) {
    return;
  }

  return (
    <>
      <Root />
    </>
  );
};

function Root() {
  const { status } = useAuthStore();
  // rember to change the state for the status to autnenticated bellow
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/home');
    } else if (status === 'authenticated') {
      router.replace('/login');
    }
  }, [status]);
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}

export default RootLayout;
