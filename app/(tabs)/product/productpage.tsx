import { View } from 'react-native';
import React from 'react';
import { Text } from '../../../components/shared';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../../constants/theme';

const Productpage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.white }}>
      <View>
        <Text>Product Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Productpage;
