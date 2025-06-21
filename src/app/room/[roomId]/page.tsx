import { Room } from "@/components/roomsturuture/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import RoomHeader from "@/components/roomsturuture/RoomHeader";
import VideoCallWrapper from "@/components/editor/VideoCallWrapper";

export default async function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <Room roomId={roomId}>
      <div className="flex flex-col gap-6 w-full h-full">
        <RoomHeader roomId={roomId} />
        <div className="flex flex-1 gap-4">
          <div className="flex-1 min-w-0">
            <CollaborativeEditor />
          </div>
          <div className="w-[420px] min-w-[320px] max-w-[520px] bg-white dark:bg-[#18181b] rounded-xl shadow border border-gray-200 flex flex-col">
            <VideoCallWrapper roomId={roomId} />
          </div>
        </div>
      </div>
    </Room>
  );
}
