import { z } from "zod";

const genreSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido"
  })
    .min(1)
    .max(100),
  
  description: z.string()
    .optional()
    .nullable()
});

// Schema para actualización (todos los campos opcionales)
const genreUpdateSchema = genreSchema.partial();

export const validateGenre = (request) => {
  return genreSchema.safeParse(request);
};

export const validateGenreUpdate = (request) => {
  return genreUpdateSchema.safeParse(request);
};

