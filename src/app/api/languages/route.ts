import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/languages",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST as string,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
