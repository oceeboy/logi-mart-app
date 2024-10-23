import { View } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../validation/auth.schema';
import { FormField } from '../../../components/wrapper/formField';
import { Button } from '../../../components/shared';
import { SignInFormSchema } from '../types/sign-in';
import { AuthService } from '../../../services/authentication';

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormSchema) => {
    await AuthService.loginUser({ ...data });
  };

  return (
    <View
      style={{
        gap: 5,
      }}
    >
      <FormField
        name="email"
        control={control}
        label="Email"
        placeholder="Enter your Email"
        errorMessage={errors.email?.message} // Display error if validation fails
      />
      <FormField
        name="password"
        control={control}
        label="Password"
        placeholder="Enter your Password"
        errorMessage={errors.password?.message} // Display error if validation fails
        secureTextEntry={true} // Ensure password is hidden
      />

      <Button
        title={'Login'}
        onPress={handleSubmit(onSubmit)} // Submit the form on button press
        containerStyle={{ height: 50, marginTop: 10 }}
        current_state={'Active'}
      />
    </View>
  );
};

export default SignInForm;
