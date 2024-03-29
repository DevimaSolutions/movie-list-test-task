import { z } from 'zod';

import {
  emailSchema,
  passwordSchema,
} from 'src/features/common/validations';

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
