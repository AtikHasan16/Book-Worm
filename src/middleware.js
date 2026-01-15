import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const proxy = async (req) => {
  const { pathname } = req.nextUrl;

  // ==============================================================
  // 1. CONFIGURATION: Public Routes
  // ==============================================================
  // Define ONLY the routes that are public. Everything else will be private.
  const publicRoutes = ["/login", "/register"];

  // ==============================================================
  // 2. GET DECODED TOKEN
  // ==============================================================
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // Make sure this is in Vercel Env Vars!
  });

  // ==============================================================
  // 3. LOGIC: REDIRECT UNAUTHENTICATED USERS
  // ==============================================================
  // If user visits a route NOT in publicRoutes AND has NO token...
  if (!publicRoutes.includes(pathname) && !token) {
    // ...redirect them to Login.
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ==============================================================
  // 4. LOGIC: REDIRECT LOGGED-IN USERS
  // ==============================================================
  // If user IS logged in but tries to visit Login or Register...
  if (publicRoutes.includes(pathname) && token) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ==============================================================
  // 5. LOGIC: PROTECT ADMIN ROUTES
  // ==============================================================
  if (pathname.startsWith("/dashboard")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};

export default proxy;