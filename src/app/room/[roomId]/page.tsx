'use client';

import { Room } from "@/components/roomsturuture/Room";
import { CollaborativeEditor } from "@/components/editor/CollaborativeEditor";
import RoomHeader from "@/components/roomsturuture/RoomHeader";
import VideoCallWrapper from "@/components/editor/VideoCallWrapper";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@/components/Loading";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as unknown as string;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/sign-in");
    }
  }, [status]);

  if (status === "loading" || !roomId) {
    return <Loading />;
  }

  return (
    <Room roomId={roomId}>
      <ClientSideSuspense fallback={<Loading />}>
        <div className="flex flex-col h-screen">
          <RoomHeader roomId={roomId} />
          <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4">
            <PanelGroup direction="horizontal" className="flex-1">
              <Panel defaultSize={70} minSize={40} className="min-w-0">
                <CollaborativeEditor />
              </Panel>
              <PanelResizeHandle className="w-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors rounded-full mx-2 flex items-center justify-center">
                <div className="w-1 h-8 bg-gray-400 dark:bg-gray-600 rounded-full" />
              </PanelResizeHandle>
              <Panel defaultSize={30} minSize={20} className="min-w-[280px]">
                <div className="w-full h-full bg-white dark:bg-[#18181b] rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
                  <VideoCallWrapper roomId={roomId} />
                </div>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </ClientSideSuspense>
    </Room>
  );
}
