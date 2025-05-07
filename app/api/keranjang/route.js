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

export async function GET(req) {
  const session = await auth();
  const user_id = session.user.id;
  // Ambil user_id dari header atau session

  if (!user_id) {
    return new Response("User ID not found", { status: 400 });
  }

  const keranjang = await prisma.keranjang.findUnique({
    where: { user_id: user_id },
  });

  if (!keranjang) {
    return new Response("Keranjang not found", { status: 404 });
  }

  const keranjangMenu = await prisma.keranjang_menu.findMany({
    where: { keranjang_id: keranjang.id },
    include: {
      menu: {
        // Mengambil informasi terkait menu yang ada di keranjang
        select: { nama_menu: true, image: true, harga: true },
      },
    },
  });

  return new Response(JSON.stringify(keranjangMenu, bigintReplacer));
}
