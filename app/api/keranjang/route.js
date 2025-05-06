import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
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
  // (opsional) verifikasi session dulu kalau API ini private
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // cari keranjang user
  const keranjang = await prisma.keranjang.findUnique({
    where: { user_id: session.user.id },
  });
  if (!keranjang) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  // ambil semua item di keranjang itu
  const items = await prisma.keranjang_menu.findMany({
    where: { keranjang_id: keranjang.id },
    orderBy: { created_at: "desc" },
  });

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
