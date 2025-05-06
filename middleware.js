import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const cookieName = req.cookies.get("__Secure-authjs.session-token")?.value
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  });

  if (!token) {
    console.log("BELOM UDAH LOGIN WOIIIIIII");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("UDAH LOGIN WOIIII", token);
  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/menu/:path*"],
};
