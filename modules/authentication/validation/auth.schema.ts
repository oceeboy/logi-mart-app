import { z } from 'zod';

const signUpSchema = z.object({
  username: z.string().min(5, 'Username has to have more than 5 characters'),
  email: z.string().email('Please enter a vaild email address'),
  password: z.string().min(8, 'Password must be more than 8 characters'),
});

const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Please enter a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 6 characters'),
});

export { signInSchema, signUpSchema };
