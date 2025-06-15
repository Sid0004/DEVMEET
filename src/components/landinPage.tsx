import { Button } from "./ui/button";

const LandinPage = () => {
  return (
    
      <section className="min-h-screenw-full py-12 md:py-24 lg:py-32 bg-background flex items-center">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            PLACE WHERE DEVS MEET AND BUILD
          </h2>
          <p className="text-center text-muted-foreground max-w mx-auto mb-12">
            Empowering developers to collaborate, innovate, and launch their ideas — all in one virtual workspace.
          </p>

          <div className="mt-10">
            <Button size="lg" className="animate-pulse">
              Join a Dev Room
            </Button>
          </div>
        </div>
      </section>
   
  );
};

export default LandinPage;
