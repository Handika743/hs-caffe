// components/AuthGuard.jsx
"use client";

import LoadingPage from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") {
    return <LoadingPage></LoadingPage>;
  } // atau tampilkan loading spinner
  return children;
}
