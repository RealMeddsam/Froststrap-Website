import { Link2 } from "lucide-react";
import { useEffect } from "react";

interface AnchorHeadingProps {
  id: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const AnchorHeading = ({ id, children, level = 2 }: AnchorHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = level === 1 
    ? "text-4xl font-bold mb-6 group flex items-center gap-2 scroll-mt-20" 
    : level === 2 
    ? "text-2xl font-bold mt-8 mb-4 group flex items-center gap-2 scroll-mt-20"
    : "text-xl font-semibold mt-6 mb-3 group flex items-center gap-2 scroll-mt-20";

  return (
    <Tag id={id} className={className}>
      {children}
      <a
        href={`#${id}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary/80"
        aria-label="Link to this section"
      >
        <Link2 className="w-5 h-5" />
      </a>
    </Tag>
  );
};

// Hook to scroll to anchor on page load
export const useAnchorScroll = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);
};
