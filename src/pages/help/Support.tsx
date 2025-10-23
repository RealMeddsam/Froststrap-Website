import { Github, MessageCircle, Mail } from "lucide-react";
import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const Support = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="support" level={1}>Support</AnchorHeading>
      
      <p className="text-lg text-muted-foreground mb-8">
        Need help? We're here to assist you through various channels.
      </p>

      <div className="grid gap-6 md:grid-cols-2 my-8">
      
        <a
          href="https://discord.gg/KdR9vpRcUN"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors no-underline">
          <MessageCircle className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">Community Discord</h3>
          <p className="text-muted-foreground">
            Join our Discord server to chat with other users and get real-time help.
          </p>
        </a>

      
        <a
          href="https://github.com/RealMeddsam/Froststrap/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors no-underline">
          <Github className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">GitHub Issues</h3>
          <p className="text-muted-foreground">
            Report bugs, request features, or browse existing issues on our GitHub repository.
          </p>
        </a>
      </div>

      <AnchorHeading id="before-requesting-support" level={2}>Before Requesting Support</AnchorHeading>
      <div className="p-6 rounded-lg bg-muted/30 border border-border mb-6">
        <p className="text-muted-foreground mb-4">
          To help us assist you more effectively, please provide:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Your Froststrap version</li>
          <li>A detailed description of the issue</li>
          <li>Steps to reproduce the problem</li>
          <li>Any error messages you've encountered</li>
          <li>The log file</li>
        </ul>
      </div>

    </div>
  );
};

export default Support;
