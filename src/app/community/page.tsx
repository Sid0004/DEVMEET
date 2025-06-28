"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Search,
  Loader2,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Types for our data
interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: { _id: string; name: string; avatar?: string }[];
  maxAttendees: number;
  category: string;
  tags: string[];
  createdBy: { _id: string; name: string; avatar?: string };
}

interface CommunityDiscussion {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; name: string; avatar?: string };
  replies: number;
  tags: string[];
  createdAt: string;
  lastActivity: string;
}

interface CommunityMember {
  _id: string;
  name: string;
  avatar?: string;
  username: string;
  bio?: string;
  lastActive?: string;
  createdAt?: string;
}

interface CommunityStats {
  members: number;
  events: number;
  discussions: number;
  projects: number;
}

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // State for dynamic data
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [stats, setStats] = useState<CommunityStats>({
    members: 0,
    events: 0,
    discussions: 0,
    projects: 0
  });
  
  // Loading states
  const [loading, setLoading] = useState({
    events: true,
    discussions: true,
    members: true,
    stats: true
  });

  // Fetch community data
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Fetch events
        const eventsResponse = await fetch('/api/community/events?limit=6');
        const eventsData = await eventsResponse.json();
        if (eventsData.success) {
          setEvents(eventsData.data);
        }

        // Fetch discussions
        const discussionsResponse = await fetch('/api/community/discussions?limit=6');
        const discussionsData = await discussionsResponse.json();
        if (discussionsData.success) {
          setDiscussions(discussionsData.data);
        }

        // Fetch members
        const membersResponse = await fetch('/api/community/members?limit=6');
        const membersData = await membersResponse.json();
        if (membersData.success) {
          setMembers(membersData.data);
        }

        // Calculate stats
        setStats({
          members: membersData.success ? membersData.total : 2847,
          events: eventsData.success ? eventsData.total : 156,
          discussions: discussionsData.success ? discussionsData.total : 892,
          projects: 1234 // Mock data for now
        });

      } catch (error) {
        console.error('Error fetching community data:', error);
      } finally {
        setLoading({
          events: false,
          discussions: false,
          members: false,
          stats: false
        });
      }
    };

    fetchCommunityData();
  }, []);

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 main-content-under-header">
      {/* Hero Section */}
      <section className="relative page-padding section-vertical-spacing">
        <div className="mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            DevMeet Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-blue-200 mb-8 mx-auto"
          >
            Connect with developers, share knowledge, and grow together in our vibrant community
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search events, discussions, or members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-xl"
              />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {loading.stats ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : stats.members.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {loading.stats ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : stats.events.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {loading.stats ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : stats.discussions.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Discussions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {loading.stats ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : stats.projects.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">Projects</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="page-padding pb-16 section-vertical-spacing">
        <div className="mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
              <TabsTrigger value="events" className="text-white data-[state=active]:bg-blue-600">Events</TabsTrigger>
              <TabsTrigger value="discussions" className="text-white data-[state=active]:bg-blue-600">Discussions</TabsTrigger>
              <TabsTrigger value="members" className="text-white data-[state=active]:bg-blue-600">Members</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8 tab-content-spacing">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Upcoming Events (left, spans 2 columns) */}
                <div className="lg:col-span-2 section-vertical-spacing">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Upcoming Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {loading.events ? (
                        <LoadingSpinner />
                      ) : events.length === 0 ? (
                        <div className="text-center text-blue-200 py-8">No upcoming events yet. Be the first to create one!</div>
                      ) : events.slice(0, 3).map((event) => (
                        <div key={event._id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-white">{event.title}</h3>
                            <Badge variant="secondary" className="bg-blue-600 text-white">
                              {event.category}
                            </Badge>
                          </div>
                          <p className="text-blue-200 text-sm mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees.length}/{event.maxAttendees}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        View All Events
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                {/* Top Contributors (right, 1 column) */}
                <div className="lg:col-span-1 section-vertical-spacing">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Top Contributors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {loading.members ? (
                        <LoadingSpinner />
                      ) : members.slice(0, 3).map((member) => (
                        <div key={member._id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{member.name}</h4>
                            <p className="text-sm text-blue-200">{member.username}</p>
                            {member.bio && <div className="text-xs text-gray-300">{member.bio}</div>}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-8 tab-content-spacing">
              <div className="space-y-6">
                {/* ...Events Tab Content... */}
              </div>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="mt-8 tab-content-spacing">
              <div className="space-y-6">
                {/* ...Discussions Tab Content... */}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="mt-8 tab-content-spacing">
              <div className="space-y-6">
                {/* ...Members Tab Content... */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage; 