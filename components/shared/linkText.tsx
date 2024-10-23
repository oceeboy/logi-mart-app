import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { THEME } from '../../constants/theme';

interface LinkTextProps {
  children: React.ReactNode;
  link: string;
  size: keyof typeof THEME.fontSize;
  weight: keyof typeof THEME.fontFamily;
}

/**
 *
 * This is to be use for when there is a link to make the codebase clean
 * @param
 * @returns
 * @example
 *
 * import  { LinkText } from "./LinkText";
 *
 * const App()=>{
 * return(
 * <LinkText  link="/home" size="h1" weight="bold">
 * Home
 * </LinkText>
 *
 *
 * )
 * }
 */

const LinkText = ({
  size = 'body2',
  weight = 'regular',
  children,
  link,
}: LinkTextProps) => {
  return (
    <>
      <Link href={link}>
        <Text
          style={[
            styles.default,
            {
              fontSize: THEME.fontSize[size],
              fontFamily: THEME.fontFamily[weight],
            },
          ]}
        >
          {children}
        </Text>
      </Link>
    </>
  );
};

export default LinkText;

const styles = StyleSheet.create({
  default: {
    color: THEME.colors.primary,
  },
});
