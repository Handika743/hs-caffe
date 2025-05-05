"use client";
import React from "react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { signInCredentials } from "@/lib/action";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const FormLogin = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(signInCredentials, null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  console.log("callbackUrl", callbackUrl);
  useEffect(() => {
    if (state?.success) {
      window.location.href = callbackUrl; // redirect ke halaman utama
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Display global error */}
      {state?.message && (
        <div className="text-sm text-red-500 bg-trirdary rounded-full text-center p-2 font-semibold">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium ">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email@example.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium ">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center bg-secondary rounded-md hover:bg-trirdary border border-secondary my-4 duration-200 hover:scale-105 hover:text-secondary">
        <LoginButton />
      </div>
      <div className="flex flex-row justify-center">
        <p>
          Belum Punya Akun ?{" "}
          <Link href={"/register"} className="text-trirdary font-bold">
            <span>Register</span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
