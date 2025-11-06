// import { NextResponse, NextRequest } from "next/server";
// // import type { NextRequest } from "next/server";

// // Middleware principal
// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   // Si no hay token, redirige al login
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next(); // si hay token, deja pasar
// }

// // Configuración: define las rutas a proteger
// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/cart",
//     "/profile/:path*",
//     "/checkout",

//   ],
// };