import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  req.headers.set("x-forwarded-host", req.headers.get("origin") || "");
  return NextResponse.next();
}