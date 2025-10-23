import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const Features = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="features" level={1}>WIP</AnchorHeading>
    </div>
  );
};

export default Features;
