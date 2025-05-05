import { object, string } from "zod";

export const RegisterSchema = object({
  name: string().min(1, "Nama harus lebih dari 1 Karakter"),
  email: string().email("Email Tidak Valid"),
  no_handphone: string().min(1, "No Handphone harus lebih dari 1 karakter"),
  password: string().min(8, "Password harus lebih dari 8 Karakter"),
  ConfirmPassword: string().min(8, "Password harus lebih dari 8 Karakter"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Password Tidak Sama",
  path: ["ConfirmPassword"],
});

export const LoginSchema = object({
  email: string().email("Email Tidak Valid"),
  password: string().min(8, "Password harus lebih dari 8 Karakter"),
});
