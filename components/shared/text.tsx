import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../constants/theme';
import React from 'react';

/**
 * Extend Native Text props
 */
export interface TextProps extends NativeTextProps {
  size?: keyof typeof THEME.fontSize;
  weight?: keyof typeof THEME.fontFamily;
}

/**
 * Custom Text component with configurable size and weight, extends Native Text
 *
 * @param {TextProps} props - The props for the Text component
 * @returns {JSX.Element} Rendered Text component
 *
 * @example
 * <Text size="h2" weight="bold">Large Bold Text</Text>
 * <Text size="body1" weight="light">Small Light Text</Text>
 * <Text>Default Text</Text>
 */
const Text = ({
  children,
  style,
  size = 'h1',
  weight = 'regular',
  ...props
}: TextProps) => {
  return (
    <NativeText
      style={[
        styles.default,
        {
          fontSize: THEME.fontSize[size],
          fontFamily: THEME.fontFamily[weight],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  default: {
    color: THEME.colors.black,
    fontFamily: THEME.fontFamily.regular,
    fontSize: THEME.fontSize.h1,
  },
});

export default Text;
