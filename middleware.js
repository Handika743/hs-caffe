import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "authjs.session-token", // WAJIB di v5
  });

  if (!token) {
    console.log("⛔️ Belum login, redirect ke /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("✅ Token ditemukan:", token);
  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/menu/:path*"],
};
