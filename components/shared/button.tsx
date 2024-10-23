import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { THEME } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  current_state: 'Active' | 'Disabled';
}

/**
 * Button component is a reusable component to help make the codebase clean
 * @param param0
 * @returns {React.ReactElement} An Adjustable component
 * @example
 * import { Button } from './Button';
 * function yourUsage() {
 *   return (
 *     <Button
 *       title="Submit"
 *       onPress={() => {}}
 *       containerStyle={{}}
 *       textStyle={{}}
 *       current_state="Active"
 *     />
 *   );
 * }
 */

const Button = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  current_state,
}: ButtonProps): React.ReactElement => {
  const isDisabled = current_state === 'Disabled';

  return (
    <TouchableOpacity
      style={[
        containerStyle,
        styles.container,
        isDisabled && styles.disabledContainer,
      ]}
      onPress={!isDisabled ? onPress : undefined}
      disabled={isDisabled}
    >
      <Text
        style={[textStyle, styles.textStyle, isDisabled && styles.disabledText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.primary,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledContainer: {
    backgroundColor: THEME.colors.inactive,
  },
  textStyle: {
    color: THEME.colors.white,
    fontFamily: THEME.fontFamily.semiBold,
    fontSize: THEME.fontSize.h3,
  },
  disabledText: {
    color: THEME.colors.inactive,
  },
});
