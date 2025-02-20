import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin")

  if (origin !== "http://localhost:3000" && !origin?.includes("github.dev")) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  return NextResponse.next()
  req.headers.set("x-forwarded-host", req.headers.get("origin") || "");
  return NextResponse.next();
}
