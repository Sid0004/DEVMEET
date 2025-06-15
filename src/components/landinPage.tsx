import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className="w-full bg-white flex items-center justify-center" style={{ minHeight: '60vh' }}>
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
          Connect. Code. Create.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Join a community of developers, collaborate in real-time, and build amazing projects together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/sign-up">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 text-base font-medium shadow">
              Get Started
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-7 py-3 text-base font-medium">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
