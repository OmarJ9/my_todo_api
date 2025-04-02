import { z } from "zod";
import { ValidationError } from "./errors";
import {
  IRegisterData,
  ILoginData,
  IUpdateUserData,
} from "../types/auth.types";

const emailSchema = z.string().email("Invalid email format");
const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");
const avatarIndexSchema = z
  .number()
  .min(0)
  .max(9, "Avatar index must be between 0 and 9");

// Define schemas
export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  avatarIndex: avatarIndexSchema.optional(),
});

// Helper function to validate data with zod
const validateWithZod = <T>(schema: z.ZodSchema, data: T): void => {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw new ValidationError("Validation error");
  }
};

// Validation functions
export const validateRegisterData = (data: IRegisterData): void => {
  validateWithZod(registerSchema, data);
};

export const validateLoginData = (data: ILoginData): void => {
  validateWithZod(loginSchema, data);
};

export const validateUpdateUserData = (data: IUpdateUserData): void => {
  validateWithZod(updateUserSchema, data);
};
