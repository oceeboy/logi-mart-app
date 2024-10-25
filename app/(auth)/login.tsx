import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import SignInForm from '../../modules/authentication/components/login-form';
import { THEME } from '../../constants/theme';
import AuthHeader from '../../modules/authentication/components/header/authheader';
import SectionContainer from '../../components/wrapper/container';
import LinkText from '../../components/shared/linkText';

const LoginPage = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.safeArea}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SectionContainer containerStyle={{ marginHorizontal: 20 }}>
            <AuthHeader
              title={'Login'}
              message={'Welcome back, please enter your details'}
            />
            <SignInForm />

            <View style={styles.rowContainer}>
              <Text style={styles.footerText}>Don&apos;t Have An Account?</Text>
              <LinkText link={'/signup'} size={'body1'} weight={'semiBold'}>
                Sign Up
              </LinkText>
            </View>
          </SectionContainer>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontFamily: THEME.fontFamily.regular,
    color: THEME.colors.black,
    fontSize: THEME.fontSize.body1,
  },
});
