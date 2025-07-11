import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

// Simple in-memory rate limiter
const rateLimitStore: Record<string, { count: number; timestamp: number }> = {};
const RATE_LIMIT_DURATION = 60000; // 1 minute
const RATE_LIMIT_COUNT = 15; // 15 requests per minute

interface CodeExecutionRequest {
  code: string;
  languageId: number;
  stdin?: string;
}

// Piston API language mapping
const PISTON_LANGUAGE_MAP: { [key: number]: string } = {
  1: "assembly",
  2: "bash",
  3: "basic",
  4: "c",
  5: "c",
  6: "c",
  7: "csharp",
  8: "cpp",
  9: "cpp",
  10: "cpp",
  11: "cpp",
  12: "lisp",
  13: "d",
  14: "elixir",
  15: "erlang",
  16: "executable",
  17: "fortran",
  18: "go",
  19: "haskell",
  20: "java",
  21: "javascript",
  22: "lua",
  23: "ocaml",
  24: "octave",
  25: "pascal",
  26: "php",
  27: "prolog",
  28: "python",
  29: "python",
  30: "ruby",
  31: "rust",
  32: "typescript",
  33: "vb"
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user._id;

  // Rate limiting
  const now = Date.now();
  const userRequests = rateLimitStore[userId] || { count: 0, timestamp: now };

  if (now - userRequests.timestamp > RATE_LIMIT_DURATION) {
    userRequests.count = 1;
    userRequests.timestamp = now;
  } else {
    userRequests.count++;
  }
  rateLimitStore[userId] = userRequests;

  if (userRequests.count > RATE_LIMIT_COUNT) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // Parse and validate request body
    const body = await req.json() as CodeExecutionRequest;
    const { code, languageId, stdin } = body;

    // Input validation
    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty code provided" },
        { status: 400 }
      );
    }

    if (!languageId || typeof languageId !== "number") {
      return NextResponse.json(
        { error: "Invalid language ID provided" },
        { status: 400 }
      );
    }

    // Get Piston language name from ID
    const pistonLanguage = PISTON_LANGUAGE_MAP[languageId];
    if (!pistonLanguage) {
      return NextResponse.json(
        { error: "Unsupported language ID" },
        { status: 400 }
      );
    }

    // Make request to Piston API
    const resp = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: pistonLanguage,
        version: "*",
        files: [
          {
            name: "main",
            content: code
          }
        ],
        stdin: stdin || ""
      }),
    });

    // Check if Piston request was successful
    if (!resp.ok) {
      console.error(`Piston API error: ${resp.status} ${resp.statusText}`);
      return NextResponse.json(
        { error: `Piston API error: ${resp.statusText}` },
        { status: resp.status }
      );
    }

    const result = await resp.json();

    // Handle Piston API response
    if (result.run && result.run.stderr) {
      return NextResponse.json(
        { error: "Runtime error", details: result.run.stderr },
        { status: 400 }
      );
    }

    if (result.compile && result.compile.stderr) {
      return NextResponse.json(
        { error: "Compilation error", details: result.compile.stderr },
        { status: 400 }
      );
    }

    // Return successful execution output
    const output = result.run?.stdout || result.compile?.stdout || "No output";
    return NextResponse.json({
      output: output,
      status: "Completed"
    });

  } catch (error: unknown) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}