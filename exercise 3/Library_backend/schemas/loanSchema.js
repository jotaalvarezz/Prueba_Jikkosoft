import { z } from "zod";

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
  
  loan_date: z.string()
    .datetime()
    .or(z.date())
    .optional(),
  
  returned_at: z.string()
    .datetime()
    .or(z.date())
    .optional()
    .nullable()
});

// Schema para actualización
const loanUpdateSchema = loanSchema.partial();

// Schema para devolver un libro
const returnBookSchema = z.object({
  returned_at: z.string()
    .datetime()
    .or(z.date())
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

