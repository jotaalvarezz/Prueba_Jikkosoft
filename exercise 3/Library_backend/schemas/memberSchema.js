import { z } from "zod";
import { formatDate } from "../utils/dateFormatter.js";

const memberSchema = z.object({
  cc: z.string({
    required_error: "La cédula es requerida"
  })
    .min(1)
    .max(50),
  
  names: z.string({
    required_error: "El nombre es requerido"
  })
    .min(1)
    .max(150),
  
  last_name: z.string({
    required_error: "El apellido es requerido"
  })
    .min(1)
    .max(150),
  
  birthdate: z.union([z.string(), z.date()])
    .transform(val => val ? formatDate(val) : null)
    .optional()
    .nullable(),
  
  phone: z.string()
    .optional()
    .nullable(),
  
  email: z.string({
    required_error: "El email es requerido"
  })
    .email("Debe ser un email válido")
});

// Schema para actualización (todos los campos opcionales)
const memberUpdateSchema = memberSchema.partial();

export const validateMember = (request) => {
  return memberSchema.safeParse(request);
};

export const validateMemberUpdate = (request) => {
  return memberUpdateSchema.safeParse(request);
};
