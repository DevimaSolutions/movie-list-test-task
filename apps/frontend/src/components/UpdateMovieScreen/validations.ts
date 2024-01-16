import { number, string, z } from 'zod';

import { imageSchema } from 'src/validation-schemas/image.schema';

export const updateMovieSchema = z.object({
  title: string().min(2).max(255).optional(),
  publishingYear: number().int().positive().lte(new Date().getFullYear()).optional(),
  image: imageSchema.optional(),
});
