// app/keranjang/page.js
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import KeranjangMenu from "@/components/Keranjang/KeranjangMenu";
import LoadingPage from "../loading";

const KeranjangPage = () => {
  const { data: session } = useSession();
  const [keranjangMenu, setKeranjangMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKeranjang = async () => {
    if (!session) return;

    const response = await fetch("/api/keranjang");
    if (response.ok) {
      const data = await response.json();
      setKeranjangMenu(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchKeranjang();
    }
  }, [session]);

  return (
    <div className="px-10 flex flex-col">
      <h1 className="font-bold text-2xl text-center p-10">Keranjang</h1>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <KeranjangMenu keranjangMenu={keranjangMenu} />
      )}
    </div>
  );
};

export default KeranjangPage;
