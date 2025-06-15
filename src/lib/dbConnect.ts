// lib/dbConnect.ts
import mongoose from "mongoose"; 

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "devmeet", // you can change this to your DB name
    });

    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnect;
