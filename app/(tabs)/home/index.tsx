import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '../../../components/shared';
import { THEME } from '../../../constants/theme';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Home Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
});
