"use client";

import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  PaginatedGridLayout,
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
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize client
  useEffect(() => {
    if (!API_KEY || !user || !token) return;
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user,
      token,
    });
    setClient(client);

    return () => {
      client.disconnectUser();
      setClient(null);
    };
  }, [API_KEY, user, token]);

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
    if (user.id) {
        fetchToken();
    }
  }, [user.id]);

  const connectCall = async () => {
    if (!client) {
        setError("Stream client not initialized.");
        return;
    }
    setIsConnecting(true);
    setError(null);
    try {
        const callInstance = client.call("default", roomId);
        await callInstance.join({ create: true });
        setCall(callInstance);
    } catch (e: any) {
        console.error("Connection error:", e);
        if (e.name === 'NotAllowedError' || e.message?.includes('Permission denied')) {
            setError("Camera and microphone access denied. Please check your browser permissions.");
        } else if (e.message?.includes('could not start video source')) {
            setError("Failed to get video stream. The camera may already be in use by another tab or application.");
        } else {
            setError(e.message || "Failed to join call");
        }
    } finally {
        setIsConnecting(false);
    }
  };

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-red-500">
        Video Call Error: {error}
        <button onClick={connectCall} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Retry
        </button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        {!token ? 'Fetching access token...' : 'Initializing client...'}
      </div>
    )
  }

  if (!call) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <button onClick={connectCall} disabled={isConnecting} className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400">
                {isConnecting ? 'Connecting...' : 'Connect Video Call'}
            </button>
        </div>
    )
  }

  return (
    <StreamVideo client={client!}>
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
        <PaginatedGridLayout />
      </div>
      <div className="border-t border-gray-200">
        <CallControls />
      </div>
    </div>
  );
}
