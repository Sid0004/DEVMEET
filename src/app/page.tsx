import './globals.css';
import React from "react";
import { Users, Brain, Calendar, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LandingPage from '@/components/landinPage';
const features = [
  {
    icon: <Users className="w-8 h-8 text-primary mb-4" />,
    title: "Real-Time Collaboration",
    description: "Code live with peers, share sessions, and build in sync.",
  },
  {
    icon: <Brain className="w-8 h-8 text-primary mb-4" />,
    title: "AI Assistant",
    description: "Get instant code suggestions, fixes, and optimizations.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-primary mb-4" />,
    title: "Dev Events",
    description: "Join coding jams, hackathons, and community meetups.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary mb-4" />,
    title: "Ship Fast",
    description: "Build, test, and deploy from your Dev Room itself.",
  },
];

const Page = () => {
  return (
    <div className='min-h-screen'>
      <LandingPage/>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-colors duration-300"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
      </section>
    </div>
  );
};

export default Page;
