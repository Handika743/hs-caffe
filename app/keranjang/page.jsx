// app/keranjang/page.js
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const KeranjangPage = async () => {
  const keranjang = await prisma.keranjang_menu.findMany();

  return (
    <div>
      <h1>Keranjang</h1>
      {keranjang.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Harga: Rp {Number(item.harga).toLocaleString("id-ID")}</p>
        </div>
      ))}
    </div>
  );
};

export default KeranjangPage;
