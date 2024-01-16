import { z } from 'zod';

import { imageSchema } from 'src/features/common/validations';

export const updateMovieSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  publishingYear: z.coerce.number().int().positive().lte(new Date().getFullYear()).optional(),
  image: imageSchema.optional(),
});
