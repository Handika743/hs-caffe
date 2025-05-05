import React from "react";
import FormLogin from "@/components/auth/login/FormLogin";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <FormLogin />
      </div>
    </>
  );
};

export default LoginPage;
