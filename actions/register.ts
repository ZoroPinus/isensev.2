"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { UserRole } from "@prisma/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, address, confirmPassword, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };

  }

  if( password !== confirmPassword){
    return { error: "Password does not match" };
  } 
  const dateNow = new Date()
  await db.user.create({
    data: {
      name,
      email,
      address,
      phone,
      password: hashedPassword,
      emailVerified: dateNow.toISOString(),
      role: UserRole.USER
    },
  });

  return { success: "Registration Complete!" };
};



export const registerAdmin = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, address, confirmPassword, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };

  }

  if( password !== confirmPassword){
    return { error: "Password does not match" };
  } 

  const dateNow = new Date()
  await db.user.create({
    data: {
      name,
      email,
      address,
      phone,
      emailVerified: dateNow.toISOString(),
      password: hashedPassword,
      role: UserRole.ADMIN
    },
  });

  return { success: "Registration Complete!" };
};