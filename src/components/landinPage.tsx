import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className="w-full bg-white flex items-center  h-screen">

    <div className="w-full  mx-auto px-4 pt-8 text-center flex flex-col items-center">

        <h1 className="text-4xl   mt-[-50px] sm:text-7xl font-bold mb-4 text-black-900 whitespace-nowrap overflow-hidden border-r-4 border-gray-900 animate-typing">
          Connect. Code. Create.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Join a community of developers, collaborate in real-time, and build amazing projects together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/sign-up">
            <Button  className="h-9 w-20 " >
              Get Started
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" className="h-9 w-20 ">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
