import type { z } from "zod";

import type { signUpSchema } from "../schemas/signup.schema";

export type SignUpFormValues = z.infer<typeof signUpSchema>;