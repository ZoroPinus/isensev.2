"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { UpdateSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserById, getUserByUsername } from "@/data/user";
import { UserRole } from "@prisma/client";

export const updateUser = async (values: z.infer<typeof UpdateSchema>, userId: string) => {
  const validatedFields = UpdateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { imgUrl } = validatedFields.data;
  
  const existingUser = await getUserById(userId);
  
  // Create a new document with the incremented idNo value
  await db.user.update({
    where: { id : existingUser!.id },
    data: {
      imgUrl: imgUrl[0].fileUrl,
    },
  });

  return { success: "Update Complete!" };
};
export const deleteUser = async (username: any) => {
  try {
    const existingUser = await getUserByUsername(username);

    if (!existingUser) {
      return { error: "User not found!" };
    }

    await db.user.delete({
      where: { username },
    });

    return { success: "User deleted successfully!" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "An error occurred while deleting the user." };
  }
};
