import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

function bigintReplacer(key, value) {
  return typeof value === "bigint" ? Number(value) : value;
}

export async function POST(req) {
  const { menu_id, harga, total_harga, nama_menu, jumlah, jenis, note } =
    await req.json();

  const session = await auth();
  const user_id = session.user.id;

  const keranjang_id = await prisma.keranjang.findUnique({
    where: { user_id: user_id },
  });

  const data = {
    keranjang_id: keranjang_id.id,
    menu_id,
    harga,
    total_harga,
    nama_menu,
    jumlah,
    jenis,
    note,
  };
  console.log(data);

  const createKeranjangMenu = await prisma.keranjang_menu.create({ data });

  return Response.json({ status: 200, isCreated: true });
}

export async function GET() {
  const keranjang = await prisma.keranjang_menu.findMany();
  return new Response(JSON.stringify(keranjang, bigintReplacer), {
    headers: { "Content-Type": "application/json" },
  });
}
