import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { z } from "zod";

// Input validation schema
const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s]*$/, "Name can only contain letters, numbers and spaces"),
  email: z.string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
});

export async function POST(req: Request) {
  try {
    // Validate request body
    const body = await req.json();
    const validatedData = signupSchema.parse(body);

    await dbConnect();

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [
        { email: validatedData.email.toLowerCase() },
        { username: validatedData.name.toLowerCase() }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already registered" }, 
        { status: 409 }
      );
    }

    // Hash password with increased salt rounds
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create new user with sanitized data
    const newUser = await User.create({
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      password: hashedPassword,
      username: validatedData.name.toLowerCase().replace(/\s+/g, ''),
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { message: "User created", user: userWithoutPassword }, 
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors }, 
        { status: 400 }
      );
    }

    console.error("Sign Up Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" }, 
      { status: 500 }
    );
  }
}
