import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const Welcome = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="welcome" level={1}>Welcome to Froststrap</AnchorHeading>
      
      <p className="text-lg text-muted-foreground mb-8">
        Froststrap is a Bloxstrap/Fishstrap fork, made to have many new features.
      </p>

      <div className="grid gap-6 md:grid-cols-2 my-8">
        <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Feature Rich</h3>
          <p className="text-muted-foreground">
            Froststrap has a bunch of cool and original features made to help you.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Customizable</h3>
          <p className="text-muted-foreground">
            Personalize your app with custom gradient/image/animated backgrounds.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
          <p className="text-muted-foreground">
            Its fully open source, you can check the code at all time.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Mod Generator</h3>
          <p className="text-muted-foreground">
            Built in mod generator that will help you make mods with the click of a button.
          </p>
        </div>
      </div>

      <div className="mt-2 pt-3 px-6 pb-6 rounded-lg bg-primary/10 border border-primary/20">
        <AnchorHeading id="getting-started" level={2}>Getting Started</AnchorHeading>
        <p className="text-muted-foreground mb-4">
          Ready to switch? Check out our installation guide to get Froststrap.
        </p>
        <a
          href="/docs/features/installation"
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          View Installation Guide →
        </a>
      </div>
    </div>
  );
};

export default Welcome;
