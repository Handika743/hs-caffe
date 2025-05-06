import React from "react";
import prisma from "@/lib/prisma";

const KeranjangPage = async () => {
  const keranjang = await prisma.keranjang_menu.findMany();
  return (
    <div>
      KeranjangPage
      {keranjang.map((item) => {
        return (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Harga: Rp {Number(item.harga).toLocaleString("id-ID")}</p>
          </div>
        );
      })}
    </div>
  );
};

export default KeranjangPage;
