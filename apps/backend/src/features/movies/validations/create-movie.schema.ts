import { number, string, z } from 'zod';

import { imageSchema } from 'src/features/common/validations';

export const createMovieSchema = z.object({
  title: string().min(2).max(255),
  publicationYear: number().int().positive().lte(new Date().getFullYear()),
  image: imageSchema,
});
