import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const extractHeadings = () => {
      const elements = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]");
      const headingData: Heading[] = Array.from(elements).map((element) => ({
        id: element.id,
        text: element.textContent?.replace(/🔗/g, "").trim() || "",
        level: parseInt(element.tagName.charAt(1)),
      }));
      setHeadings(headingData);
    };

    setTimeout(extractHeadings, 100);
  }, [location.pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0.01 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden xl:block sticky top-0 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto px-4 pt-4" aria-label="Table of contents">
      <div className="rounded-md p-2">
        <h3
          className="mb-4 text-lg font-bold"
          style={{ color: "hsl(var(--sidebar-foreground))" }}
        >
          On this page
        </h3>

        <nav className="space-y-2" aria-hidden={false}>
          {headings.map((heading) => {
            const indent = (heading.level - 1) * 0.75;
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(heading.id);
                }}
                className={`group flex items-start gap-2 rounded-md transition-colors text-base leading-snug ${
                  isActive
                    ? "font-semibold"
                    : "text-muted-foreground hover:font-medium"
                }`}
                style={{
                  paddingLeft: `${indent}rem`,
                  color: isActive ? `hsl(var(--sidebar-primary))` : undefined,
                }}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`mt-1 block rounded-full transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                  style={{
                    width: 6,
                    height: 6,
                    background: isActive ? "hsl(var(--sidebar-primary))" : "transparent",
                    boxShadow: isActive ? "0 0 0 4px rgba(0,0,0,0.04)" : undefined,
                    flex: "0 0 auto",
                    marginTop: 6,
                  }}
                />
                <span
                  className="block truncate"
                  style={{
                    color: isActive ? `hsl(var(--sidebar-primary))` : undefined,
                    textShadow: isActive ? "0 0 0 transparent" : undefined,
                  }}
                >
                  {heading.text}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
