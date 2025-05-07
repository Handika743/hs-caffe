// app/api/menu/imageMenu/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { ids } = await req.json(); // Expecting an array of menu IDs

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      { error: "Invalid or empty IDs" },
      { status: 400 }
    );
  }

  const imageMenus = await prisma.menu.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      nama_menu: true,
      gambar: true, // misalnya field gambar
    },
  });

  return NextResponse.json(imageMenus);
}
