'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  CopyIcon, 
  Users, 
  Code2, 
  Lock, 
  Globe, 
  Loader2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Video,
  MessageSquare,
  UserPlus,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type RoomType = 'public' | 'private';
type RoomSettings = {
  isPrivate: boolean;
  maxParticipants: number;
  allowChat: boolean;
  allowVideo: boolean;
};

const CreateRoomPage = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('public');
  const [settings, setSettings] = useState<RoomSettings>({
    isPrivate: false,
    maxParticipants: 4,
    allowChat: true,
    allowVideo: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [userRooms, setUserRooms] = useState<any[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [showRoomsSheet, setShowRoomsSheet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setRoomId(nanoid(10));
  }, []);

  // Set username from session if available
  useEffect(() => {
    if (session?.user?.username) {
      setUsername(session.user.username);
    } else if (session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [session]);

  // Fetch user's previous rooms
  useEffect(() => {
    const fetchRooms = async () => {
      setLoadingRooms(true);
      const res = await fetch('/api/room/user-rooms');
      const data = await res.json();
      setUserRooms((data.rooms || []).filter((r: any) => r.createdBy?._id === session?.user?._id));
      setLoadingRooms(false);
    };
    if (session?.user?._id) fetchRooms();
  }, [session]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-white text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (status === 'unauthenticated') {
    router.push('/sign-in');
    return null;
  }

  const handleCreateRoom = async () => {
    if (!username.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/room/create', {
        method: 'POST',
        body: JSON.stringify({ 
          roomId,
          settings,
          type: roomType
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Room creation failed');
      setCreatedRoomId(roomId);
      toast.success('Room created successfully!');
      // router.push(`/room/${roomId}?username=${encodeURIComponent(username)}`); // Only redirect on button click
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!username.trim() || !joinRoomId.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/room/join', {
        method: 'POST',
        body: JSON.stringify({ roomId: joinRoomId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Room not found');

      toast.success('Joining room...');
      router.push(`/room/${joinRoomId}?username=${encodeURIComponent(username)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room ID copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4 py-12 pt-[90px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative"
      >
        <Sheet open={showRoomsSheet} onOpenChange={setShowRoomsSheet}>
          <SheetTrigger asChild>
            <Button className="mb-4 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 w-full sm:w-auto font-semibold">
              Show My Rooms
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black border-gray-800 w-full max-w-xs z-[120]">
            <SheetHeader>
              <SheetTitle className="text-blue-300">My Rooms</SheetTitle>
            </SheetHeader>
            {loadingRooms ? (
              <div className="flex items-center justify-center py-4 text-gray-400">
                Loading your rooms...
              </div>
            ) : (userRooms.length > 0 ? (
              <div className="flex flex-col gap-3 mt-4">
                {userRooms.map((room) => (
                  <div key={room._id} className="flex flex-col gap-1 bg-gray-800/60 rounded-lg px-3 py-2 mb-2">
                    <span className="font-mono text-blue-200">{room.roomId}</span>
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" variant="outline" className="border-gray-700 text-xs px-2 py-1" onClick={() => {navigator.clipboard.writeText(room.roomId)}}>
                        Copy ID
                      </Button>
                      <Button size="sm" className="bg-blue-700 text-white text-xs px-2 py-1" onClick={() => router.push(`/room/${room.roomId}?username=${encodeURIComponent(username)}`)}>
                        Go to Room
                      </Button>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {room.createdBy?._id === session?.user?._id ? 'Created by you' : 'Joined'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 mt-4">No rooms found.</div>
            ))}
          </SheetContent>
        </Sheet>
        <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader className="space-y-1 pb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-4"
            >
              <Sparkles className="w-8 h-8 text-blue-500 mr-2" />
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                DevMeet Room
              </CardTitle>
            </motion.div>
            <CardDescription className="text-center text-gray-400 text-lg">
              Start coding together in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="create" className="space-y-8">
              <TabsList className="w-full grid grid-cols-2 bg-gray-800/30 p-1 rounded-xl">
                <TabsTrigger 
                  value="create" 
                  className="data-[state=active]:bg-blue-600/80 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  Create Room
                </TabsTrigger>
                <TabsTrigger 
                  value="join" 
                  className="data-[state=active]:bg-green-600/80 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Room
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300 text-sm font-medium">Your Name</Label>
                    <Input
                      id="username"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white h-12"
                    />
                  </div>
                  <Label className="text-gray-300 text-sm font-medium">Room Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={roomType === 'public' ? 'default' : 'outline'}
                      className={`w-full h-12 ${roomType === 'public' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800/50 hover:bg-gray-800'}`}
                      onClick={() => setRoomType('public')}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Public
                    </Button>
                    <Button
                      type="button"
                      variant={roomType === 'private' ? 'default' : 'outline'}
                      className={`w-full h-12 ${roomType === 'private' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800/50 hover:bg-gray-800'}`}
                      onClick={() => setRoomType('private')}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Private
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    <span className="font-semibold">Public:</span> Anyone with the room link can join.<br/>
                    <span className="font-semibold">Private:</span> Only invited users can join. (Feature coming soon)
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-4 bg-gray-800/40 border-gray-700 text-gray-200 hover:bg-gray-800"
                    onClick={() => setShowSettings((v) => !v)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {showSettings ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
                  </Button>
                  {showSettings && (
                    <div className="space-y-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4 text-gray-400" />
                          <Label htmlFor="maxParticipants" className="text-gray-300">Max Participants</Label>
                        </div>
                        <Input
                          id="maxParticipants"
                          type="number"
                          min="2"
                          max="10"
                          value={settings.maxParticipants}
                          onChange={(e) => setSettings({ ...settings, maxParticipants: parseInt(e.target.value) })}
                          className="w-20 bg-gray-800/50 border-gray-700 text-white text-center"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <Label htmlFor="allowChat" className="text-gray-300">Enable Chat</Label>
                          <span className="ml-2 px-2 py-0.5 text-xs rounded bg-yellow-500/20 text-yellow-500 font-semibold">Coming soon</span>
                        </div>
                        <Switch
                          id="allowChat"
                          checked={settings.allowChat}
                          onCheckedChange={(checked: boolean) => setSettings({ ...settings, allowChat: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-gray-400" />
                          <Label htmlFor="allowVideo" className="text-gray-300">Enable Video</Label>
                          <span className="ml-2 px-2 py-0.5 text-xs rounded bg-yellow-500/20 text-yellow-500 font-semibold">Coming soon</span>
                        </div>
                        <Switch
                          id="allowVideo"
                          checked={settings.allowVideo}
                          onCheckedChange={(checked: boolean) => setSettings({ ...settings, allowVideo: checked })}
                        />
                      </div>
                    </div>
                  )}
                  {!createdRoomId && (
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-lg font-medium"
                      onClick={handleCreateRoom}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating Room...
                        </>
                      ) : (
                        <>
                          Create Room
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                  {createdRoomId && (
                    <div className="flex flex-col items-center gap-4 mt-6">
                      <div className="text-green-400 font-semibold text-lg">Room created successfully!</div>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={createdRoomId}
                          readOnly
                          className="bg-gray-800/50 border-gray-700 text-white font-mono h-12 w-48 text-center"
                        />
                        <Button
                          onClick={handleCopy}
                          variant="outline"
                          className="bg-gray-800/50 border-gray-700 h-12 hover:bg-gray-800"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-lg font-medium"
                        onClick={() => router.push(`/room/${createdRoomId}?username=${encodeURIComponent(username)}`)}
                      >
                        Go to Room <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="join" className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="joinUsername" className="text-gray-300 text-sm font-medium">Your Name</Label>
                    <Input
                      id="joinUsername"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roomId" className="text-gray-300 text-sm font-medium">Room ID</Label>
                    <Input
                      id="roomId"
                      placeholder="Enter the room ID"
                      value={joinRoomId}
                      onChange={(e) => setJoinRoomId(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white font-mono h-12"
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 text-lg font-medium"
                    onClick={handleJoinRoom}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Joining Room...
                      </>
                    ) : (
                      <>
                        Join Room
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateRoomPage;
