import FormRegister from "@/components/auth/register/FormRegister";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Buat Akun</h1>
      <FormRegister />
    </div>
  );
};

export default RegisterPage;
