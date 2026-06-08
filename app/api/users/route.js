import { getUsers } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = getUsers();
  return NextResponse.json(users);
}
