"use client";
import React from "react";
import Link from "next/link";
import { signUpCredentials } from "@/lib/action";
import { useActionState } from "react";
import RegisterButton from "./RegisterButton";

const FormRegister = () => {
  const [state, formAction] = useActionState(signUpCredentials, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Display global error */}
      {state?.validation && (
        <div className="text-sm text-red-500 bg-trirdary rounded-full text-center p-2 font-semibold">
          {state.validation}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium ">
          Nama
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nama Lengkap"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true" className="">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.name}
          </span>
        </div>
      </div>
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
        <label
          htmlFor="no_handphone"
          className="block mb-2 text-sm font-medium "
        >
          Nomor Handphone
        </label>
        <input
          type="tel"
          name="no_handphone"
          id="no_handphone"
          placeholder="08........"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.no_handphone}
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
      <div>
        <label
          htmlFor="ConfirmPassword"
          className="block mb-2 text-sm font-medium "
        >
          Konfirmasi Password
        </label>
        <input
          type="password"
          name="ConfirmPassword"
          id="ConfirmPassword"
          placeholder="********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.ConfirmPassword}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-center bg-secondary rounded-md hover:bg-trirdary border border-secondary my-4 duration-200 hover:scale-105 hover:text-secondary">
        <RegisterButton />
      </div>
      <div className="flex flex-row justify-center">
        <p>
          Sudah Punya Akun ?{" "}
          <Link href={"/login"} className="text-trirdary font-bold">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormRegister;
