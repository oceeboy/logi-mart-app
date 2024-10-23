import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { THEME } from '../../../../constants/theme';

interface AuthHeaderProps {
  title: string;
  message: string;
}

/**
 * This component is used for the page title and message
 * @param param0
 * @returns
 *
 * @example
 * import AuthHeader from "./AuthHeader";
 *
 * const App =()=>{
 * return (
 *       <AuthHeader title={""} message={""}/>
 *
 * )
 *
 * }
 *
 *
 */

const AuthHeader = ({ title, message }: AuthHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontFamily: THEME.fontFamily.semiBold,
    fontSize: THEME.fontSize.h1,
  },
  message: {
    fontFamily: THEME.fontFamily.regular,
    fontSize: THEME.fontSize.h5,
  },
});
