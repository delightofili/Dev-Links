import { getLinks } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const links = getLinks();

  return NextResponse.json(links);
}
