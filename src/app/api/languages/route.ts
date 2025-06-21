//api/languages/route.ts

import { NextResponse } from "next/server";

// Piston API supported languages with their IDs
const PISTON_LANGUAGES = [
  { id: 1, name: "Assembly (NASM 2.14.02)" },
  { id: 2, name: "Bash (5.0.0)" },
  { id: 3, name: "Basic (FBC 1.07.1)" },
  { id: 4, name: "C (GCC 7.4.0)" },
  { id: 5, name: "C (GCC 8.3.0)" },
  { id: 6, name: "C (GCC 9.2.0)" },
  { id: 7, name: "C# (Mono 6.6.0.161)" },
  { id: 8, name: "C++ (GCC 7.4.0)" },
  { id: 9, name: "C++ (GCC 8.3.0)" },
  { id: 10, name: "C++ (GCC 9.2.0)" },
  { id: 11, name: "C++ (G++ 9.2.0)" },
  { id: 12, name: "Common Lisp (SBCL 2.0.0)" },
  { id: 13, name: "D (DMD 2.089.1)" },
  { id: 14, name: "Elixir (1.9.4)" },
  { id: 15, name: "Erlang (OTP 22.2)" },
  { id: 16, name: "Executable" },
  { id: 17, name: "Fortran (GFortran 9.2.0)" },
  { id: 18, name: "Go (1.13.5)" },
  { id: 19, name: "Haskell (GHC 8.8.1)" },
  { id: 20, name: "Java (OpenJDK 13.0.1)" },
  { id: 21, name: "JavaScript (Node.js 12.14.0)" },
  { id: 22, name: "Lua (5.3.5)" },
  { id: 23, name: "OCaml (4.09.0)" },
  { id: 24, name: "Octave (5.1.0)" },
  { id: 25, name: "Pascal (FPC 3.0.4)" },
  { id: 26, name: "PHP (7.4.1)" },
  { id: 27, name: "Prolog (GNU Prolog 1.4.5)" },
  { id: 28, name: "Python (2.7.17)" },
  { id: 29, name: "Python (3.8.1)" },
  { id: 30, name: "Ruby (2.7.0)" },
  { id: 31, name: "Rust (1.40.0)" },
  { id: 32, name: "TypeScript (3.7.4)" },
  { id: 33, name: "Visual Basic.Net (vbnc 0.0.0.5943)" }
];

export async function GET() {
  try {
    // Return the predefined list of Piston supported languages
    return NextResponse.json(PISTON_LANGUAGES, { status: 200 });
  } catch (error: any) {
    console.error("Languages API error:", error);
    return NextResponse.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
