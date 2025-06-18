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

// Function to generate unique username
async function generateUniqueUsername(baseName: string): Promise<string> {
  // Clean the base name to create a valid username
  let username = baseName
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .replace(/[^a-z0-9]/g, '') // Remove special characters
    .substring(0, 20); // Limit length

  // Ensure minimum length
  if (username.length < 3) {
    username = username + 'user';
  }

  let counter = 1;
  let finalUsername = username;

  while (true) {
    const existingUser = await User.findOne({ username: finalUsername });
    if (!existingUser) {
      break;
    }
    finalUsername = `${username}${counter}`;
    counter++;
    
    // Prevent infinite loop
    if (counter > 100) {
      finalUsername = `${username}${Date.now()}`;
      break;
    }
  }

  return finalUsername;
}

export async function POST(req: Request) {
  try {
    // Validate request body
    const body = await req.json();
    const validatedData = signupSchema.parse(body);

    await dbConnect();

    // Check for existing user by email
    const existingUserByEmail = await User.findOne({ 
      email: validatedData.email.toLowerCase() 
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email already registered" }, 
        { status: 409 }
      );
    }

    // Generate unique username
    const username = await generateUniqueUsername(validatedData.name);
    console.log("Generated username:", username);

    // Hash password with increased salt rounds
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create new user with sanitized data
    const newUser = await User.create({
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      password: hashedPassword,
      username: username,
      isVerified: true, // Set to true since we don't have email verification
      isAcceptingMessages: true,
    });

    console.log("User created successfully:", {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { 
        message: "User created successfully", 
        user: userWithoutPassword 
      }, 
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
      { error: "Something went wrong during signup" }, 
      { status: 500 }
    );
  }
}
