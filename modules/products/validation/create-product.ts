import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  price: z
    .number()
    .positive('Price must be a positive number')
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'Price must be a valid number with up to two decimal places',
    }),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .optional(),
  image: z.string().url('Image must be a valid URL').optional().nullable(),
});

export { productSchema };
