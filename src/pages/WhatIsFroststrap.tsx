import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const WhatIsFroststrap = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="what-is-froststrap" level={1}>What is Froststrap?</AnchorHeading>
      
      <p className="text-lg text-muted-foreground mb-6">
        Froststrap is a custom bootstrapper made to provide a bunch of features and customization options.
      </p>

      <AnchorHeading id="core-purpose" level={2}>Core Purpose</AnchorHeading>
      <p className="text-muted-foreground mb-4">
        Froststrap serves as a modern replacement for traditional launchers like Bloxstrap and Fishstrap, offering:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
	   <li>Includes many extra features such as a built-in Region Selector and more useful tools.</li>
	   <li>Features a modern, fully customizable interface that you can personalize to your liking.</li>
	   <li>Gets regular updates with improvements, fixes, and new additions over time.</li>
      </ul>

      <AnchorHeading id="key-features" level={2}>Key Features</AnchorHeading>
      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-xl font-semibold mb-2">Region Selector</h3>
          <p className="text-muted-foreground">
            Connect to servers closest to you easily.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-xl font-semibold mb-2">Custom App Themes</h3>
          <p className="text-muted-foreground">
            Create your own custom background using gradients, images, or animated.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-xl font-semibold mb-2">Mod Generator</h3>
          <p className="text-muted-foreground">
            Generate mod using gradient colors in a single click.
          </p>
        </div>
      </div>

      <AnchorHeading id="why-choose-froststrap" level={2}>Why Choose Froststrap?</AnchorHeading>
      <p className="text-muted-foreground mb-4">
        Froststrap stands out from other launchers through its combination of performance, 
        customization, and user-friendly design. Whether you're a casual user or an advanced user, 
        Froststrap has the features you need.
      </p>
    </div>
  );
};

export default WhatIsFroststrap;
