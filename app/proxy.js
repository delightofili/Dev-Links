import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export default async function proxy(request) {
  const { pathname } = request.nextUrl;
  // const session = await getSession(request);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
