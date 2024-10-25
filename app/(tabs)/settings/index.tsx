import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from '../../../components/shared';
import React from 'react';
import { THEME } from '../../../constants/theme';

import { AuthService } from '../../../services/authentication';

const SettingsPage = () => {
  const LogOut = async () => {
    await AuthService.logOutUser();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.white }}>
      <View style={{ marginHorizontal: 20, justifyContent: 'center', flex: 1 }}>
        <Text>Settings page</Text>
        <Button
          onPress={LogOut}
          containerStyle={{ height: 50 }}
          title={'Logout'}
          current_state={'Active'}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
