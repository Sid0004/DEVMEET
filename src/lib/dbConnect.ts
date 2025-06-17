// lib/dbConnect.ts
import mongoose from "mongoose"; 

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "devmeet", 
    });

    isConnected = !!db.connections[0].readyState;
  } catch (error) {
    throw error;
  }
};

export default dbConnect;
