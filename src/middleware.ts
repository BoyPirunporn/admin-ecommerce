import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // ตรวจสอบว่าเป็นหน้าที่ไม่ต้องการล็อกอิน
  const isAuthPage = pathname.startsWith("/auth");

  // ถ้าผู้ใช้ล็อกอินแล้ว แต่เข้าหน้าล็อกอินหรือสมัครสมาชิก ให้ redirect กลับไปที่หน้าแรก
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ถ้าเป็นหน้าที่ต้องการการล็อกอิน และไม่มี token ให้ redirect ไปที่หน้า sign-in
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // อนุญาตให้ผ่านในกรณีอื่นๆ
  return NextResponse.next();
}

export const config = {
  matcher: ["/" ]
};