// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import {
//   User, Users, PlusCircle, Loader2, DoorOpen, Eye
// } from 'lucide-react';

// type Participant = {
//   _id: string;
//   name: string;
//   username?: string;
//   avatar?: string;
//   email?: string;
// };

// type Room = {
//   _id: string;
//   roomId: string;
//   createdBy: Participant;
//   participants: Participant[];
//   createdAt: string;
// };

// const Dashboard = () => {
//   const { data: session, status } = useSession();
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       setLoading(true);
//       const res = await fetch('/api/room/user-rooms');
//       const data = await res.json();
//       setRooms(data.rooms || []);
//       setLoading(false);
//     };
//     fetchRooms();
//   }, []);

//   const user = session?.user || {};
//   const createdRooms = rooms.filter((room) => room.createdBy?._id === user._id);
//   const joinedRooms = rooms.filter((room) => room.createdBy?._id !== user._id);

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   const RoomCard = ({ room, color }: { room: Room; color: 'blue' | 'green' }) => (
//     <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
//       <div className="flex items-center justify-between">
//         <span className={`text-sm font-mono text-${color}-600 flex items-center gap-1`}>
//           <Eye className="w-4 h-4" /> {room.roomId}
//         </span>
//         <span className="text-xs text-gray-400">{new Date(room.createdAt).toLocaleDateString()}</span>
//       </div>
//       <div className="mt-2 text-xs text-gray-500">
//         {room.participants.length} participants
//       </div>
//       <div className="mt-2 flex items-center gap-2 flex-wrap">
//         {room.participants.map((p) => (
//           <img
//             key={p._id}
//             src={p.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(p.name)}
//             alt={p.name}
//             className="w-7 h-7 rounded-full border object-cover"
//             title={p.name}
//           />
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="px-6 py-8 max-w-6xl mx-auto space-y-10">
//       {/* User Welcome */}
//       <div className="flex items-center gap-4">
//         {user.avatar ? (
//           <img src={user.avatar} alt="avatar" className="w-14 h-14 rounded-full border-2 border-blue-600 object-cover" />
//         ) : (
//           <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600">
//             <User className="w-8 h-8 text-blue-600" />
//           </div>
//         )}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name || user.username}!</h2>
//           <p className="text-sm text-gray-500">{user.email}</p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
//           <div className="bg-blue-100 p-3 rounded-full">
//             <PlusCircle className="text-blue-600 w-6 h-6" />
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-blue-900">{createdRooms.length}</div>
//             <div className="text-gray-500 text-sm">Rooms Created</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
//           <div className="bg-green-100 p-3 rounded-full">
//             <Users className="text-green-600 w-6 h-6" />
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-green-900">{joinedRooms.length}</div>
//             <div className="text-gray-500 text-sm">Rooms Joined</div>
//           </div>
//         </div>
//       </div>

//       {/* Created Rooms */}
//       <section>
//         <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
//           <PlusCircle className="w-5 h-5" /> Rooms You Created
//         </h3>
//         {createdRooms.length === 0 ? (
//           <p className="text-gray-500 italic">You haven't created any rooms yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {createdRooms.map((room) => (
//               <RoomCard key={room._id} room={room} color="blue" />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Joined Rooms */}
//       <section>
//         <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
//           <DoorOpen className="w-5 h-5" /> Rooms You're In
//         </h3>
//         {joinedRooms.length === 0 ? (
//           <p className="text-gray-500 italic">You're not in any rooms yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {joinedRooms.map((room) => (
//               <RoomCard key={room._id} room={room} color="green" />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react'

const dashboard = () => {
  return (
    <div>dashboard</div>
  )
}

export default dashboard