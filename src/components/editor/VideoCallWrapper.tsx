"use client";

import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  User,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!;
const REGION = "ap-south-1"; // Mumbai region

export default function VideoCallWrapper({ roomId }: { roomId: string }) {
  const [user] = useState<User>(() => {
    const id = typeof window !== "undefined"
      ? (window.localStorage.getItem("stream_user_id") ||
        (() => {
          const newId = "user_" + Math.random().toString(36).slice(2, 10);
          window.localStorage.setItem("stream_user_id", newId);
          return newId;
        })())
      : "user_demo";
    return {
      id,
      name: id,
      image: `https://getstream.io/random_svg/?id=${id}&name=${id}`,
    };
  });

  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch a real token from the backend
  useEffect(() => {
    async function fetchToken() {
      try {
        const resp = await fetch("/api/stream-video-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });
        const data = await resp.json();
        console.log("Got stream token:", data.token);
 
        if (data.token) setToken(data.token);
        else setError(data.error || "Failed to get token");
      } catch (e: any) {
        setError(e.message || "Failed to get token");
      }
    }
    fetchToken();
  }, [user.id]);

  useEffect(() => {
    if (!API_KEY || !user || !token) return;
    const c = new StreamVideoClient({
      apiKey: API_KEY,
      user,
      token,
    });
    setClient(c);
    const callInstance = c.call("default", roomId);
    callInstance
      .join({ create: true })
      .then(() => setCall(callInstance))
      .catch((e: any) => setError(e.message || "Failed to join call"));
    return () => {
      c.disconnectUser();
    };
  }, [API_KEY, user, token, roomId]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Video Call Error: {error}
      </div>
    );
  }
  if (!client || !call) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Connecting to video call…
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <VideoCallUI />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
}

function VideoCallUI() {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if (callingState !== CallingState.JOINED) {
    return <div className="flex-1 flex items-center justify-center text-gray-400">Joining…</div>;
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <SpeakerLayout participantsBarPosition="bottom" />
      </div>
      <div className="border-t border-gray-200">
        <CallControls />
      </div>
    </div>
  );
}
