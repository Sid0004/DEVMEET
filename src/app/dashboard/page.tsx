import React from 'react';
import { User, Folder, Calendar, MessageCircle, PlusCircle } from 'lucide-react';

const user = {
  name: 'John Doe',
  avatar: '', // Add avatar URL if available
};

const stats = [
  { label: 'Projects', value: 8, icon: <Folder className="w-6 h-6 text-blue-600" /> },
  { label: 'Events', value: 3, icon: <Calendar className="w-6 h-6 text-green-600" /> },
  { label: 'Messages', value: 12, icon: <MessageCircle className="w-6 h-6 text-purple-600" /> },
];

const recentActivity = [
  { id: 1, text: 'Joined the "React Hackathon" event.' },
  { id: 2, text: 'Created a new project: "AI Chatbot".' },
  { id: 3, text: 'Sent a message to Jane.' },
];

const Dashboard = () => {
  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex items-center gap-4 mb-8">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="w-14 h-14 rounded-full border-2 border-blue-600" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600">
            <User className="w-8 h-8 text-blue-600" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Welcome back, {user.name}!</h2>
          <p className="text-gray-500">Here's what's happening today:</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-blue-50 rounded-full p-3 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          <PlusCircle className="w-5 h-5" />
          New Project
        </button>
        <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
          <Calendar className="w-5 h-5" />
          Join Event
        </button>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition">
          <MessageCircle className="w-5 h-5" />
          New Message
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
              {activity.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;