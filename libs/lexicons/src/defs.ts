import { z } from 'zod';

export const IngredientObject = z.object({
  name: z.string().max(3000, 'Ingredient names must be under 3000 characters.'),
  amount: z.number().nullable(),
  unit: z.string().max(3000, 'Ingredient units must be under 3000 characters.').nullable(),
});

export type Ingredient = z.infer<typeof IngredientObject>;

export const StepObject = z.object({
  text: z.string().max(5000, 'Recipe steps must be under 5000 characters.'),
});

export type Step = z.infer<typeof StepObject>;
