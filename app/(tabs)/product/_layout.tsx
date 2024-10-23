import { Stack } from 'expo-router';
import React from 'react';

function ProductLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="productpage" />
    </Stack>
  );
}

export default ProductLayout;
