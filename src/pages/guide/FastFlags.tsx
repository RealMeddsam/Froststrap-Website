import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const FastFlags = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="fastflags" level={1}>WIP</AnchorHeading>
    </div>
  );
};

export default FastFlags;

