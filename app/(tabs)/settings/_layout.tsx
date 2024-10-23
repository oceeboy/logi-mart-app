import { Stack } from 'expo-router';
import React from 'react';
function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default SettingsLayout;
