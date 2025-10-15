import { z } from "zod";
import { formatDateTime } from "../utils/dateFormatter.js";

const loanSchema = z.object({
  book_id: z.number({
    required_error: "Libro es requerido"
  })
    .int()
    .positive(),
  
  member_id: z.number({
    required_error: "Miembro es requerido"
  })
    .int()
    .positive(),
  
  loan_date: z.union([z.string(), z.date()])
    .transform(val => val ? formatDateTime(val) : formatDateTime(new Date()))
    .optional(),
  
  returned_at: z.union([z.string(), z.date()])
    .transform(val => val ? formatDateTime(val) : null)
    .optional()
    .nullable()
});

// Schema para actualización
const loanUpdateSchema = loanSchema.partial();

// Schema para devolver un libro
const returnBookSchema = z.object({
  returned_at: z.union([z.string(), z.date()])
    .transform(val => val ? formatDateTime(val) : formatDateTime(new Date()))
    .optional()
});

export const validateLoan = (request) => {
  return loanSchema.safeParse(request);
};

export const validateLoanUpdate = (request) => {
  return loanUpdateSchema.safeParse(request);
};

export const validateReturnBook = (request) => {
  return returnBookSchema.safeParse(request);
};

