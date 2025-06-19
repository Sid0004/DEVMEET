// app/room/[roomId]/page.tsx  ←  SERVER component (no "use client")

import { Room } from "@/components/Room";              // client wrapper
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import RoomHeader from "@/components/RoomHeader";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  // Check authentication on server side
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/sign-in');
  }

  // Await params in Next.js 15
  const { roomId } = await params;

  // You can read params synchronously because this file is server‑side
  return (
    <Room roomId={roomId}>
      <div className="flex flex-col gap-6 w-full h-full">
        <RoomHeader roomId={roomId} />
        <div className="flex-1 min-h-0">
          <CollaborativeEditor />
        </div>
      </div>
    </Room>
  );
}
