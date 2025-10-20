import { NextResponse } from "next/server";
import { authRoutes } from "./lib/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;
  const token = req.cookies.get("aqua-access-token")?.value;
  // console.log("----------=====------------+++object", token);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/user/:path*", "/seller/:path*"],
};
