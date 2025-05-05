import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const menu = await prisma.menu.findMany({
    select: { jenis_menu: true },
  });

  const uniqueTypes = Array.from(new Set(menu.map((m) => m.jenis_menu)));

  return NextResponse.json(uniqueTypes);
}
