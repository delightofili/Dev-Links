import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEconder().encode(process.env.AUTH_SECRET);

//routes anyone could visit

const publicRoute = ["/login", "/register"];

//api routes that don't need auth

const publicApiRoutes = ["/api/links"];

async function getSession(request) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export default async function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);

  //auth pages

  const isPublicRoute = publicRoute.includes(pathname);

  if (!session && !isPublicRoutes && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //security headers

  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;",
    );
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
