import { z } from "zod";

const bookSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido"
  })
    .min(1)
    .max(150),
  
  author: z.string()
    .optional()
    .nullable(),
  
  library_id: z.number({
    required_error: "La biblioteca es requerido"
  })
    .int()
    .positive(),
  
  description: z.string()
    .optional()
    .nullable(),
  //si llega una cadena vacia, latransformo a esa url por defecto
  cover_url: z.string()
    .transform(val => val === '' || val === undefined || val === null 
      ? 'https://picsum.photos/seed/book-1984/300/450' 
      : val)
    .default('https://picsum.photos/seed/book-1984/300/450')
});

// Schema para actualización (todos los campos opcionales)
const bookUpdateSchema = bookSchema.partial();

export const validateBook = (request) => {
  return bookSchema.safeParse(request);
};

export const validateBookUpdate = (request) => {
  return bookUpdateSchema.safeParse(request);
};
