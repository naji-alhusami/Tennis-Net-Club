import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, searchParams } = new URL(request.url);
  if (pathname === "/reservation") {
    const dateParam = searchParams.get("date");
    // const courtParam = searchParams.get("court");
    const playersParam = searchParams.get("players");

    if (dateParam) {
      const reservationDate = new Date(dateParam); // date taken from link
      const currentDate = new Date(); // current day from 12:00AM 
      currentDate.setHours(0, 0, 0, 0);

      if (reservationDate < currentDate) {
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
