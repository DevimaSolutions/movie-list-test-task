import { number, string, z } from 'zod';

import { imageSchema } from 'src/validation-schemas/image.schema';

export const createMovieSchema = z.object({
  title: string().min(2).max(255),
  publishingYear: number().int().positive().lte(new Date().getFullYear()),
  image: imageSchema,
});
