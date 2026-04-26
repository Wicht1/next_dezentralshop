import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  return NextResponse.json(
    {
      source: "dezentralshop.ch",
      filters: { brand, category },
      products: [],
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
