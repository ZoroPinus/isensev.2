"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { ContactsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const createContact = async (values: z.infer<typeof ContactsSchema>) => {
  const validatedFields = ContactsSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, phone } = validatedFields.data;
  const currentUserData = await currentUser();
  if (!currentUserData || !currentUserData.id) {
    return { error: "User not found or missing ID!" };
  }

  const userId = currentUserData.id;
  try {
    await db.contact.create({
      data: { name, phone, userId },
    });

    return { success: "Contact created successfully" };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      error: "There was an error creating the contact. Please try again.",
    };
  }
};

export const updateContact = async (id: string, values: z.infer<typeof ContactsSchema>) => {
    const validatedFields = ContactsSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
  
    const { name, phone } = validatedFields.data;
    try {
      const updatedContact = await db.contact.update({
        where: { id },
        data: { name, phone },
      });
  
      if (!updatedContact) {
        return { error: "Contact not found" };
      }
  
      return { success: "Contact updated successfully" };
    } catch (error) {
      console.error("Error updating contact:", error);
      return {
        error: "There was an error updating the contact. Please try again.",
      };
    }
  };

export const getContacts = async (userId: string) => {
  try {
    const contacts = await db.contact.findMany({
      where: { userId },
    });
    if (contacts == null) {
      return { error: "No Result" };
    }
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      error: "There was an error fetching the contacts. Please try again.",
    };
  }
};
