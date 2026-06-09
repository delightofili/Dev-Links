import { z } from "zod";

export const linkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed more than 100 characters"),
  url: z.string().url("Please enter a valid URL"),
  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description must not exceed more than 500 characters"),
  category: z.enum(["article", "tutorial", "job"], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
});
