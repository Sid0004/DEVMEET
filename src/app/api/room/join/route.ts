import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";

export async function POST(req: Request) {
  try {
    const { roomId } = await req.json();

    if (!roomId) {
      return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
    }

    await dbConnect();

    const existingRoom = await Room.findOne({ roomId });
    if (!existingRoom) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Joined room", room: existingRoom }, { status: 200 });
  } catch (error) {
    console.error("Join Room Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
