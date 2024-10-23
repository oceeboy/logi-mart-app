import { z } from 'zod';
import { signUpSchema } from '../validation/auth.schema';

export type SignUpFormSchema = z.infer<typeof signUpSchema>;
