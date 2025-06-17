"use client";
import LandingPage from "@/components/landingPage";
import { features } from "@/data/features";
import { motion } from "framer-motion";

interface Feature {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: string;
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <LandingPage />

      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 via-blue-950 to-blue-50 py-16 relative">
        {/* Top gradient overlay for smooth transition */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-950 to-transparent"></div>
        
        <div className="w-full max-w-7xl px-4 flex flex-col items-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-12 text-center"
          >
            Everything You Need to Build Amazing Projects
          </motion.h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center h-full border border-white/20"
              >
                <div className="text-blue-400 mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}