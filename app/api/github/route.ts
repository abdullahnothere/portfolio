import { NextResponse } from "next/server";
import { getGitHubData } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const data = await getGitHubData();
  return NextResponse.json(data);
}
