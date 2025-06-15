import LandingPage from "@/components/landinPage";
import { Code2, MessageSquare, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Real-time Collaboration",
    description: "Code together in real-time with built-in chat and video calls."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI Assistance",
    description: "Get help from AI-powered coding assistants and code review tools."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Dev Events",
    description: "Join virtual hackathons, workshops, and networking events."
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Fast Shipping",
    description: "Deploy your projects quickly with our integrated deployment tools."
  }
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <LandingPage />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Everything you need to build amazing projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
