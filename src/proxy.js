import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// We mark this function 'async' because decrypting the token takes a moment
const proxy = async (req) => {
  const { pathname } = req.nextUrl;

  // ==============================================================
  // 1. CONFIGURATION: Public Routes
  // ==============================================================
  const publicRoutes = ["/login", "/register"];

  // ==============================================================
  // 2. GET DECODED TOKEN (Crucial for Role Checks)
  // ==============================================================
  // We use getToken instead of req.cookies.get.
  // This decrypts the secure cookie so we can read 'token.role' and 'token.email'.
  // Make sure NEXTAUTH_SECRET is set in your .env file!
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ==============================================================
  // 3. LOGIC: REDIRECT UNAUTHENTICATED USERS
  // ==============================================================
  // If the user visits a PRIVATE route (not in publicRoutes) and has NO token...
  if (!publicRoutes.includes(pathname) && !token) {
    // ...redirect them to Login.
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ==============================================================
  // 4. LOGIC: REDIRECT LOGGED-IN USERS (UX Improvement)
  // ==============================================================
  // If user IS logged in but tries to visit Login or Register...
  if (publicRoutes.includes(pathname) && token) {
    // If they are an Admin, send them to Dashboard
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Regular users go to Home
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ==============================================================
  // 5. LOGIC: PROTECT ADMIN ROUTES (The "Admin Only" Rule)
  // ==============================================================
  // If user tries to visit ANY path starting with "/dashboard"...
  if (pathname.startsWith("/dashboard")) {
    // ...and their role is NOT 'admin'...
    if (token?.role !== "admin") {
      // ...kick them back to the Home page.
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // If all checks pass, let them through!
  return NextResponse.next();
};

// ==============================================================
// 6. MATCHER CONFIGURATION
// ==============================================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (so login endpoints work)
     * - _next/static & _next/image (Next.js assets)
     * - favicon.ico (browser icon)
     * - images (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};

export default proxy;
