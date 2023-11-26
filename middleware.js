import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, searchParams } = new URL(request.url);
  if (pathname === "/reservation") {
    const dateParam = searchParams.get("date");
    // const courtParam = searchParams.get("court");
    const playersParam = searchParams.get("players");

    if (dateParam) {
      const reservationDate = new Date(dateParam);
      const currentDate = new Date();

      if (reservationDate <= currentDate) {
        return NextResponse.redirect(new URL("/reservation", request.url));
      }
    }

    // if (courtParam) {
    //   if (!(playersParam === "Clay")) {
    //     return NextResponse.redirect(new URL("/reservation", request.url));
    //   }

    //   if (!(courtParam === "Hard")) {
    //     return NextResponse.redirect(new URL("/reservation", request.url));
    //   }
    // }

    if (playersParam) {
      if (playersParam <= 1 || playersParam >= 4) {
        return NextResponse.redirect(new URL("/reservation", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/reservation", "/calendar", "/partner", "/manage"],
};
