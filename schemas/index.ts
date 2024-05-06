import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const MemberRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone: z.string().min(11, { message: "Phone must be at least 11 digits" }),
  address: z.string(),
  age: z.coerce.number().min(2, { message: "Please input your age" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  idType: z.string().min(1, { message: "Please select an ID type" }),
  id: z.string().min(1, { message: "Please input your ID number" }),
  password: z.string().min(1, { message: "Please input your password" }),
  confirmPassword: z.string().min(1, { message: "Please input your password" }),
});
