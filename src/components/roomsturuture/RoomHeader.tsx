"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatars } from "@/components/editor/Avatars";
import { useState } from "react";

export default function RoomHeader({ roomId }: { roomId: string }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const roomUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    if (roomUrl) {
      await navigator.clipboard.writeText(roomUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleLeave = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-card text-card-foreground rounded-xl shadow-md border">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="font-semibold text-lg text-primary truncate max-w-xs" title={roomId}>
          Room: {roomId}
        </span>
        <Avatars />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="w-[90px]" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button variant="destructive" className="w-[90px]" onClick={handleLeave}>
          Leave Room
        </Button>
      </div>
    </div>
  );
} 