import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const Troubleshooting = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="troubleshooting" level={1}>Troubleshooting</AnchorHeading>
      
      <p className="text-lg text-muted-foreground mb-8">
        Solutions to common issues you might encounter with Froststrap.
      </p>

      <AnchorHeading id="common-issues" level={2}>Common Issues</AnchorHeading>

      <div className="space-y-4">
        <div className="p-6 rounded-lg bg-card border border-border">
          <AnchorHeading id="froststrap-wont-start" level={3}>Froststrap won't start</AnchorHeading>
          <p className="text-muted-foreground mb-3">
            If Roblox fails to launch, try the following:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Turn on Roblox Reinstallation in settings</li>
            <li>Set channel change action to never change in settings</li>
          </ul>
        </div>

        <div className="mt-6 p-6 rounded-lg bg-primary/10 border border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Still Having Issues?</h2>
          <p className="text-muted-foreground mb-4">
            If you've tried these solutions and are still experiencing problems, please visit our 
            support page to get help from the community or report a bug.
          </p>
          <a
            href="/help/support"
            className="text-primary hover:underline font-medium">
            Visit Support Page →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooting;
