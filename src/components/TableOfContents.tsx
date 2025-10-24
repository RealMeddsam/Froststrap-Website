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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        } else {
          const scrollY = window.scrollY;
          const closestAbove = headings
            .map((h) => document.getElementById(h.id))
            .filter(Boolean)
            .filter((el) => (el as HTMLElement).offsetTop < scrollY + 100)
            .sort((a, b) => (b!.offsetTop - a!.offsetTop));
          if (closestAbove.length > 0) {
            setActiveId(closestAbove[0]!.id);
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: [0, 0.1, 0.5, 1] }
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
    <nav className="w-full">
      <h4 className="font-semibold text-sm mb-4 text-left">On this page</h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
              className={`block text-sm transition-colors hover:text-primary text-left ${
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};