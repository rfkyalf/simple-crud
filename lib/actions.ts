"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const contactSchema = z.object({
  name: z.string().min(3),
  phoneNumber: z.string().min(10),
});

export async function createContact(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    // Membuat kontak baru dalam database menggunakan Prisma
    await prisma.contact.create({
      data: {
        name: validatedFields.data.name,
        phoneNumber: validatedFields.data.phoneNumber,
      },
    });
  } catch (error) {
    return { message: "Failed to create contact" };
  }

  revalidatePath("/contact");
  redirect("/contact");
}

export async function updateContact(
  id: string,
  prevState: any,
  formData: FormData
) {
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    // Update kontak dalam database menggunakan Prisma
    await prisma.contact.update({
      data: {
        name: validatedFields.data.name,
        phoneNumber: validatedFields.data.phoneNumber,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update contact" };
  }

  revalidatePath("/contact");
  redirect("/contact");
}

export async function deleteContact(id: string) {
  try {
    // Delete kontak dalam database menggunakan Prisma
    await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete contact" };
  }

  revalidatePath("/contact");
}
