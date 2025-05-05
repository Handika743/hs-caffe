import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const jenis = searchParams.get("jenis_menu");
  const nama = searchParams.get("nama_menu");

  const where = {};
  if (jenis) where.jenis_menu = jenis;
  if (nama) where.nama_menu = { contains: nama, mode: "insensitive" };

  const menu = await prisma.menu.findMany({ where });
  const parsedMenu = convertBigInt(menu);
  return Response.json(parsedMenu);
}
