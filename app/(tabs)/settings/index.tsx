import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../components/shared';
import React from 'react';
import { THEME } from '../../../constants/theme';

const SettingsPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.white }}>
      <View>
        <Text>Settings page</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
