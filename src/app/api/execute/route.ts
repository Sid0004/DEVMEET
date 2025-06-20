import { NextRequest, NextResponse } from "next/server";

interface CodeExecutionRequest {
  code: string;
  languageId: number;
}

async function getValidLanguageIds(): Promise<number[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/languages`, {
      method: "GET",
    });
    console.log("Languages API response status:", response.status);
    if (!response.ok) {
      console.error("Failed to fetch languages:", response.statusText);
      return [];
    }
    const languages = await response.json(); // Simple JSON parsing
    console.log("Fetched languages:", languages);
    return languages.map((lang: { id: number }) => lang.id);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json() as CodeExecutionRequest;
    const { code, languageId } = body;
    console.log("Received code:", code, "languageId:", languageId);

    // Input validation
    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty code provided" },
        { status: 400 }
      );
    }

    // Fetch valid language IDs dynamically


   
    // Make request to Judge0 API
    const resp = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({ source_code: code, language_id: languageId }),
      }
    );

    // Check if Judge0 request was successful
    if (!resp.ok) {
      const errorData = await resp.json();
      return NextResponse.json(
        { error: errorData.message || "Judge0 API error" },
        { status: resp.status }
      );
    }

    const result = await resp.json();

    // Handle specific Judge0 response cases
    if (result.status?.id === 6) { // Compilation error
      return NextResponse.json(
        { error: "Compilation error", details: result.compile_output },
        { status: 400 }
      );
    }

    if (result.status?.id === 11) { // Runtime error
      return NextResponse.json(
        { error: "Runtime error", details: result.stderr },
        { status: 400 }
      );
    }

    // Return successful execution output
    return NextResponse.json({
      output: result.stdout || result.stderr || "No output",
      status: result.status?.description || "Completed"
    });

  } catch (error: any) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}