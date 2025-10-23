import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Search, Github, Menu, ChevronRight, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchContent, SearchResult } from "@/lib/searchData";
import { useTheme } from "@/components/ThemeProvider";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { TableOfContents } from "@/components/TableOfContents";
import froststrap from "@/assets/froststrap-logo.png";

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { title: "Welcome", path: "/docs" },
  { title: "What is Froststrap?", path: "/docs/what-is-froststrap" },
  { title: "Frequently Asked Questions", path: "/docs/faq" },
  {
    title: "Guide",
    children: [
      { title: "Installation", path: "/docs/guide/installation" },
      { title: "Features", path: "/docs/guide/features" },
    ],
  },
  {
    title: "Help",
    children: [
      { title: "Troubleshooting", path: "/docs/help/troubleshooting" },
      { title: "Support", path: "/docs/help/support" },
    ],
  },
];

const NavSection = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (item.children) {
    return (
      <div className="mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 text-base font-semibold text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
        >
          {item.title}
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <div className="ml-4 pl-3 border-l-2 border-border space-y-1">
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path!}
                end
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <NavLink
        to={item.path!}
        end
        className={({ isActive }) =>
          `block px-3 py-2 text-base font-semibold rounded-md transition-colors ${
            isActive ? "bg-primary/10 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`
        }
      >
        {item.title}
      </NavLink>
    </div>
  );
};

export const DocsLayout = () => {
  const LEFT_WIDTH_PX = 256;
  const TOC_WIDTH_PX = 256;
  const SCROLLBAR_WIDTH_PX = 12;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const mainScrollRef = useRef<HTMLDivElement | null>(null);
  const externalScrollRef = useRef<HTMLDivElement | null>(null);
  const externalScrollInnerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  /** Click outside search */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Prevent body scroll */
  useEffect(() => {
    const docEl = document.documentElement;
    const body = document.body;
    const prevStyles = {
      docOverflow: docEl.style.overflow,
      bodyOverflow: body.style.overflow,
      docHeight: docEl.style.height,
      bodyHeight: body.style.height,
    };

    docEl.style.height = "100%";
    body.style.height = "100%";
    docEl.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      docEl.style.overflow = prevStyles.docOverflow;
      body.style.overflow = prevStyles.bodyOverflow;
      docEl.style.height = prevStyles.docHeight;
      body.style.height = prevStyles.bodyHeight;
    };
  }, []);

  /** Search logic */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = searchContent(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    const path = result.anchor ? `${result.path}#${result.anchor}` : result.path;
    navigate(path);
    setShowSearchResults(false);
    setSearchQuery("");
    if (result.anchor) {
      setTimeout(() => {
        const el = document.getElementById(result.anchor!);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  /** Sync scroll with external scrollbar */
  useEffect(() => {
    const mainEl = mainScrollRef.current;
    const externalEl = externalScrollRef.current;
    const externalInner = externalScrollInnerRef.current;
    if (!mainEl || !externalEl || !externalInner) return;

    let isSyncingMain = false;
    let isSyncingExternal = false;

    const updateExternalHeight = () => {
      externalInner.style.height = `${mainEl.scrollHeight}px`;
    };

    const onMainScroll = () => {
      if (isSyncingExternal) return;
      isSyncingMain = true;
      externalEl.scrollTop = mainEl.scrollTop;
      setTimeout(() => (isSyncingMain = false), 0);
    };

    const onExternalScroll = () => {
      if (isSyncingMain) return;
      isSyncingExternal = true;
      mainEl.scrollTop = externalEl.scrollTop;
      setTimeout(() => (isSyncingExternal = false), 0);
    };

    mainEl.addEventListener("scroll", onMainScroll);
    externalEl.addEventListener("scroll", onExternalScroll);

    const ro = new ResizeObserver(updateExternalHeight);
    ro.observe(mainEl);

    const mo = new MutationObserver(updateExternalHeight);
    mo.observe(mainEl, { childList: true, subtree: true, characterData: true });

    updateExternalHeight();

    return () => {
      mainEl.removeEventListener("scroll", onMainScroll);
      externalEl.removeEventListener("scroll", onExternalScroll);
      ro.disconnect();
      mo.disconnect();
    };
  }, [location.pathname]);

  /** Update external scrollbar on window resize */
  useEffect(() => {
    const mainEl = mainScrollRef.current;
    const externalInner = externalScrollInnerRef.current;
    if (!mainEl || !externalInner) return;
    const handler = () => (externalInner.style.height = `${mainEl.scrollHeight}px`);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
        <div className="flex h-16 items-center justify-between px-6">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={froststrap} alt="Froststrap" className="h-10 w-10" />
            <span className="font-bold text-xl">Froststrap</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-9 pr-20 bg-muted/50"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchResults(false);
                  }}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                Ctrl K
              </kbd>

              {/* Search results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0"
                    >
                      <div className="font-medium text-sm">{result.title}</div>
                      {result.section && <div className="text-xs text-muted-foreground mt-1">{result.section}</div>}
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.content}</div>
                    </button>
                  ))}
                </div>
              )}
              {showSearchResults && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 px-4 py-3">
                  <div className="text-sm text-muted-foreground">No results found for "{searchQuery}"</div>
                </div>
              )}
            </div>
          </div>

          {/* Top nav buttons */}
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <a href="https://github.com/RealMeddsam/Froststrap" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <a href="https://discord.gg/BeCRubaU" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <DiscordIcon />
              </a>
            </Button>
            <div className="h-6 w-px bg-border" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>

      <div className="relative">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar p-4 overflow-hidden transition-transform md:translate-x-0`}
        >
          <nav className="h-full overflow-y-auto">
            {navItems.map((item) => (
              <NavSection key={item.title} item={item} />
            ))}
          </nav>
        </aside>

        {/* Table of contents */}
        <aside
          className="hidden xl:flex fixed top-16 z-30 h-[calc(100vh-4rem)] w-64 border-l border-border bg-sidebar p-8 overflow-hidden"
          style={{ right: `${SCROLLBAR_WIDTH_PX}px` }}
        >
          <TableOfContents />
        </aside>

        {/* External scrollbar */}
        <div
          ref={externalScrollRef}
          className="external-scrollbar fixed top-16 right-0 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden z-40"
          style={{ width: `${SCROLLBAR_WIDTH_PX}px`, background: "transparent" }}
        >
          <div ref={externalScrollInnerRef} style={{ width: 1, pointerEvents: "none" }} />
        </div>

        {/* Main content */}
        <div className="ml-0 md:ml-64 h-[calc(100vh-4rem)] flex" style={{ marginRight: `${TOC_WIDTH_PX + SCROLLBAR_WIDTH_PX}px` }}>
          <main
            ref={mainScrollRef}
            className="flex-1 pt-4 pl-4 overflow-y-auto no-scrollbar"
            style={{ WebkitOverflowScrolling: "touch", height: "100%" }}
          >
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
