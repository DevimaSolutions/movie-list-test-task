import { z } from 'zod';

import { imageSchema } from 'src/features/common/validations';

export const createMovieSchema = z.object({
  title: z.string().min(2).max(255),
  publishingYear: z.coerce.number().int().positive().lte(new Date().getFullYear()),
  image: imageSchema,
});
