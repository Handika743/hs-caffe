"use server";
import { RegisterSchema, LoginSchema } from "./zod";
import { hashSync } from "bcryptjs";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "./auth";
import { AuthError } from "next-auth";

//sign Up credentials
export const signUpCredentials = async (prevState, formData) => {
  const validationFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFields.success) {
    return {
      validation: "Gagal Registrasi, Periksa Inputan Anda",
      error: validationFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, no_handphone, password } = validationFields.data;
  const hashedPassword = hashSync(password, 10);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      validation: "Gagal Registrasi, Periksa Inputan Anda",
      error: {
        email: "Email sudah digunakan",
      },
    };
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        no_handphone,
        password: hashedPassword,
      },
    });
    await prisma.keranjang.create({
      data: {
        user_id: newUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  } catch (error) {
    return {
      error: "Gagal Registrasi",
    };
  }
  redirect("/login");
};

// Sign In Credentials
export const signInCredentials = async (prevState, formData) => {
  const validationFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFields.success) {
    return {
      validation: "Gagal Login, Periksa Inputan Anda",
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Jangan auto-redirect
    });

    // Jika login gagal
    if (!result || result.error) {
      return {
        message: "Email atau Password salah",
      };
    }

    // Jika berhasil, redirect manual dari client (pakai useRouter di FormLogin)
    return { success: true };
  } catch (error) {
    // Anda bisa menghapus console.log ini nanti jika sudah berfungsi
    console.error("CAUGHT ERROR:", error);
    if (error instanceof AuthError) {
      // Anda bisa menghapus console.log ini nanti jika sudah berfungsi
      console.error("AUTH ERROR TYPE:", error.type);

      switch (error.type) {
        case "CredentialsSignin": // Tetap jaga case ini
        case "CallbackRouteError": // <<< TAMBAHKAN CASE INI
          // Log opsional untuk memastikan case ini terpanggil
          console.log(`Handling known auth error type: ${error.type}`);
          return { message: "Email atau Password salah" }; // Pesan yang benar
        default:
          // Log opsional untuk tipe tak terduga lainnya
          console.error(`Unhandled AuthError type: '${error.type}'.`);
          return { message: "Terjadi kesalahan saat login" }; // Pesan fallback
      }
    }
    console.error("Error is not an instance of AuthError.");
    return { message: "Terjadi kesalahan tidak dikenal" };
  }
};
