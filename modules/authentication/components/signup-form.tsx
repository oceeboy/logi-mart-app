import { View } from 'react-native';
import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormSchema } from '../types/sign-up';
import { signUpSchema } from '../validation/auth.schema';
import { FormField } from '../../../components/wrapper/formField';
import { Button } from '../../../components/shared';
import { AuthService } from '../../../services/authentication';

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormSchema) => {
    await AuthService.signUpUser({ ...data });
  };

  return (
    <View
      style={{
        gap: 5,
      }}
    >
      <FormField
        name="username"
        control={control}
        label="Username"
        placeholder="Enter a Username"
        errorMessage={errors.email?.message} // Display error if validation fails
      />
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
        placeholder="Create your password"
        errorMessage={errors.password?.message} // Display error if validation fails
        secureTextEntry={true} // This ensures password is hidden
      />

      <Button
        title={'Sign Up'}
        onPress={handleSubmit(onSubmit)} // Submit the form on button press
        containerStyle={{ height: 50, marginTop: 10 }}
        current_state={'Active'}
      />
    </View>
  );
};

export default SignUpForm;
