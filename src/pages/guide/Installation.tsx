import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const Installation = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="installation" level={1}>Installation</AnchorHeading>
      
      <p className="text-lg text-muted-foreground mb-8">
        Get Froststrap Working Easily.
      </p>

      <AnchorHeading id="system-requirements" level={2}>System Requirements</AnchorHeading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
        <li>Windows 10 or later (64-bit)</li>
        <li>.NET Framework 8.0</li>
      </ul>

      <AnchorHeading id="download" level={2}>Download</AnchorHeading>
      <div className="p-6 rounded-lg bg-card border border-border mb-6">
        <p className="text-muted-foreground mb-4">
          Download the latest version of Froststrap from our official GitHub releases page.
        </p>
        <a
          href="https://github.com/RealMeddsam/Froststrap/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Download Latest Release →
        </a>
      </div>

      <AnchorHeading id="installation-steps" level={2}>Installation Steps</AnchorHeading>
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h3 className="font-semibold mb-2">Download the Installer</h3>
            <p className="text-muted-foreground">
              Download the Froststrap installer (.exe) from the official GitHub releases page.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h3 className="font-semibold mb-2">Run the Installer</h3>
            <p className="text-muted-foreground">
              Double-click the downloaded file to launch the installation wizard.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h3 className="font-semibold mb-2">Launch Froststrap</h3>
            <p className="text-muted-foreground">
              Once installed, you can launch Froststrap from your desktop or start menu.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-bold mb-2">Next Steps</h3>
        <p className="text-muted-foreground mb-4">
          Now that Froststrap is installed, check out some of our features.
        </p>
        <a
          href="/features/configuration"
          className="text-primary hover:underline font-medium"
        >
          Configuration Guide →
        </a>
      </div>
    </div>
  );
};

export default Installation;
