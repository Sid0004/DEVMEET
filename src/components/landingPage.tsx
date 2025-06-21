import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Globe } from "@/components/magicui/globe";
import { Marquee } from "@/components/magicui/marquee";
import CardStack from "./CardStack";

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
            Spin up real-time collaborative coding environments with built-in
            video, chat, and code execution — perfect for interviews, pair
            programming, and team debugging.
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
              <Button className="w-40 text-white hover:bg-blue-700 hover:text-white bg-transparent  transition duration-300">
                Try for free
              </Button>
            </Link>
          </div>
        </div>
        {/* Globe */}
        <div className="absolute bottom-[-200px] right-[-200px] z-0 flex items-center justify-center w-[659px] h-[659px] opacity-40">
          <Globe />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-950 text-white py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
          <div className="text-content">
            <h2 className="text-4xl font-extrabold mb-6">
              Explore the DevMeet Toolbox
            </h2>
            <p className="text-gray-400 mb-4">
              Our platform is more than just a code editor. It's a fully-featured
              collaborative environment designed to streamline the development
              process.
            </p>
            <p className="text-gray-400">
              Hover over the cards to see how each layer contributes to a
              seamless and powerful coding experience. From live communication
              tools to robust code execution, we've got you covered.
            </p>
          </div>
          <div className="card-stack-wrapper flex items-center justify-center">
            <CardStack />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
