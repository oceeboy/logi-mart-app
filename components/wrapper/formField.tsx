import React, { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { THEME } from '../../constants/theme';
import { Eye, EyeSlash } from 'iconsax-react-native';

interface FormTextInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  rules?: Partial<{
    required: string | boolean;
    maxLength: number;
    minLength: number;
  }>;
  multiline?: boolean;
  errorMessage?: string;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onBlur?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  required?: boolean;
  secureTextEntry?: boolean;
}

/**
 *
 *
 * @param param0
 * @returns
 *
 *
 */

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  rules,
  multiline = false,
  errorMessage,
  inputStyle,
  containerStyle,
  required = false,
  secureTextEntry = false, // Accept secureTextEntry for password fields
}: FormTextInputProps<TFieldValues>): React.ReactElement {
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <View style={[styles.containerB, containerStyle]}>
            {label && (
              <View style={styles.label}>
                <Text style={styles.inputLabel}>{label}</Text>
                {required && <Text style={{ color: '#f60000' }}>*</Text>}
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={[inputStyle, styles.input]}
                multiline={multiline}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry && !isPasswordVisible} // Toggle password visibility
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIconContainer}
                >
                  {isPasswordVisible ? (
                    <Eye size="20" color={THEME.colors.primary} /> // Show eye icon when visible
                  ) : (
                    <EyeSlash size="20" color={THEME.colors.primary} /> // Show eye-slash icon when hidden
                  )}
                </TouchableOpacity>
              )}
            </View>
            {(error || errorMessage) && (
              <Text style={styles.errorText}>
                {error?.message || errorMessage}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  label: {},
  containerB: {
    width: 'auto',
    borderRadius: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 5,
    height: 48,
  },
  input: {
    flex: 1,
    fontFamily: THEME.fontFamily.regular,
  },
  eyeIconContainer: {
    padding: 10,
  },
  inputLabel: {
    fontSize: THEME.fontSize.h4,
    fontFamily: THEME.fontFamily.regular,
    marginBottom: 5,
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.fontSize.body3,

    fontFamily: THEME.fontFamily.regular,
  },
});
