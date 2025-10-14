import { z } from "zod";

const librarySchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido"
  })
    .min(1)
    .max(150),
  
  address: z.string()
    .optional()
    .nullable(),
  
  email: z.string()
    .email("Debe ser un email válido")
    .optional()
    .nullable(),
  
  phone: z.string()
    .optional()
    .nullable(),
  
  description: z.string()
    .optional()
    .nullable()
});

// Schema para actualización (todos los campos opcionales)
const libraryUpdateSchema = librarySchema.partial();

export const validateLibrary = (request) => {
  return librarySchema.safeParse(request);
};

export const validateLibraryUpdate = (request) => {
  return libraryUpdateSchema.safeParse(request);
};
