'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CopyIcon } from 'lucide-react';

const CreateRoomPage = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const router = useRouter();

  useEffect(() => {
    setRoomId(nanoid(10));
  }, []);

  const handleCreateRoom = async () => {
    if (!username.trim()) {
      toast.error('Enter a username');
      return;
    }

    const res = await fetch('/api/room/create', {
      method: 'POST',
      body: JSON.stringify({ roomId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message || 'Room creation failed');

    router.push(`/room/${roomId}?username=${encodeURIComponent(username)}`);
  };

  const handleJoinRoom = async () => {
    if (!username.trim() || !joinRoomId.trim()) {
      toast.error('Fill both fields');
      return;
    }

    const res = await fetch('/api/room/join', {
      method: 'POST',
      body: JSON.stringify({ roomId: joinRoomId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message || 'Room not found');

    router.push(`/room/${joinRoomId}?username=${encodeURIComponent(username)}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room ID copied!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-xl">
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="w-full flex justify-center gap-4 bg-gray-800">
            <TabsTrigger value="create" className="w-1/2">Create</TabsTrigger>
            <TabsTrigger value="join" className="w-1/2">Join</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 mt-6">
            <Input
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white"
            />
            <div className="flex gap-2">
              <Input value={roomId} readOnly className="bg-gray-800 text-white" />
              <Button onClick={handleCopy}><CopyIcon className="w-4 h-4" /></Button>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCreateRoom}>
              Create Room
            </Button>
          </TabsContent>

          <TabsContent value="join" className="space-y-4 mt-6">
            <Input
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white"
            />
            <Input
              placeholder="Enter Room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              className="bg-gray-800 text-white"
            />
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleJoinRoom}>
              Join Room
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateRoomPage;
