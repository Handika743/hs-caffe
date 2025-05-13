import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const authPath = ["/login", "/register"];
  const adminPath = ["/dashboard"];

  const pathname = req.nextUrl.pathname;
  const cookieName = req.cookies.get("__Secure-authjs.session-token")?.value
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  });

  if (!token && authPath.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ 2. Cegah user yang belum login akses halaman lain
  if (!token) {
    console.log("BELOM UDAH LOGIN WOIIIIIII");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token.role !== "Admin" && adminPath.includes(pathname)) {
    console.log("BUKAN ADMIN, TIDAK BOLEH AKSES HALAMAN ADMIN");
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (token && authPath.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/menu/:path*", "/login", "/register", "/dashboard"],
};
