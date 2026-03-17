import { z } from "zod";

export const cardFormSchema = z.object({
  template: z.enum(["neon-license", "civic-profile", "travel-pass"]),
  imageShape: z.enum(["circle", "rounded", "square"]),
  characterName: z.string().max(40, "40文字以内で入力してください"),
  alias: z.string().max(30, "30文字以内で入力してください"),
  world: z.string().max(40, "40文字以内で入力してください"),
  affiliation: z.string().max(40, "40文字以内で入力してください"),
  rank: z.string().max(30, "30文字以内で入力してください"),
  skill: z.string().max(40, "40文字以内で入力してください"),
  birthDate: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
  cardId: z.string().max(30, "30文字以内で入力してください"),
  signature: z.string().max(30, "30文字以内で入力してください"),
  slogan: z.string().max(60, "60文字以内で入力してください"),
  favoriteColor: z.string(),
  watermarkText: z.string().max(20, "20文字以内で入力してください"),
});

export type CardFormValues = z.infer<typeof cardFormSchema>;
