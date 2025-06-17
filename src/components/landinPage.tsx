import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Globe } from "@/components/magicui/globe";
import { Marquee } from "@/components/magicui/marquee";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gray-950 flex items-center min-h-[calc(100vh-75px)] text-white py-24 relative overflow-hidden">
        <div className="w-full max-w-6xl px-4 mt-[80px] z-10 ml-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold mb-6">
            <span className="text-blue-400">&lt;/&gt; DevMeet</span> built for <br />
            collaborations
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mb-10">
            Spin up real-time collaborative coding environments with built-in video, chat, and code execution — perfect for interviews, pair programming, and team debugging.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <Link href="/sign-up">
              <Button
                variant="outline"
                className="w-40  text-black hover:bg-white-100 hover:text-black border border-blue-700 transition duration-300"
              >
                Start for free
              </Button>
            </Link>
            <Link href="room/create-room">
              <Button
                className="w-40 text-white hover:bg-blue-700 hover:text-white bg-transparent  transition duration-300"
              >
                Try for free
              </Button>
            </Link>
          </div>
       
          {/* Marquee */}
          <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden bg-gray-950">
            <div className="relative flex w-full items-center justify-center">
              <Marquee pauseOnHover className="[--duration:20s]">
                <div className="text-4xl sm:text-3xl font-semibold text-blue-800">
                  {Array(20).fill("CONNECT • CODE • CREATE • ").join("")}
                </div>
              </Marquee>

              {/* Left gradient shadow */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-950 to-transparent"></div>

              {/* Right gradient shadow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-950 to-transparent"></div>
            </div>
          </div>
        </div>
        {/* Globe */}
        <div className="absolute bottom-[-200px] right-[-200px] z-0 flex items-center justify-center w-[659px] h-[659px] opacity-40">
          <Globe />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
