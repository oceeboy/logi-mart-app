import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';
import SignUpForm from '../../modules/authentication/components/signup-form';
import SectionContainer from '../../components/wrapper/container';
import AuthHeader from '../../modules/authentication/components/header/authheader';
import LinkText from '../../components/shared/linkText';

const SignUp = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.safeArea}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SectionContainer containerStyle={{ marginHorizontal: 20 }}>
            <AuthHeader
              title={'Sign up'}
              message={'Create an account to get started with us.'}
            />
            <SignUpForm />
            <View style={styles.rowContainer}>
              <Text style={styles.footerText}>Already Have An Account?</Text>
              <LinkText link={'/login'} size={'body1'} weight={'semiBold'}>
                Login
              </LinkText>
            </View>
          </SectionContainer>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },

  alertText: {
    fontSize: THEME.fontSize.h1,
    fontFamily: THEME.fontFamily.bold,
    color: THEME.colors.red,
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
