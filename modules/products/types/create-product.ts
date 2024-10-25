import { z } from 'zod';
import { productSchema } from '../validation/create-product';

export type ProductSchema = z.infer<typeof productSchema>;
