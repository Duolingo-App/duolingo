import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// This function checks the JWT token on each request
export async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  // If there is no token or it's invalid, redirect to sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  try {
    // Verify the token and allow the request to proceed if valid
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    // If the token is invalid, redirect to sign-in page
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

// This is to exclude some routes (like the public routes) from the middleware
export const config = {
  matcher: ["/dashboard", "/profile", "/api/user"], // Exclude /api/auth/me
};