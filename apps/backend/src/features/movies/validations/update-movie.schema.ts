import { number, string, z } from 'zod';

import { imageSchema } from 'src/features/common/validations';

export const updateMovieSchema = z.object({
  title: string().min(2).max(255).optional(),
  publicationYear: number().int().positive().lte(new Date().getFullYear()).optional(),
  image: imageSchema.optional(),
});
