import { z } from 'zod';
import { signInSchema } from '../validation/auth.schema';

export type SignInFormSchema = z.infer<typeof signInSchema>;
