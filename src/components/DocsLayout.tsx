import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Search, Menu, ChevronRight, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchContent, SearchResult } from "@/lib/searchData";
import { useTheme } from "@/components/ThemeProvider";
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
      { title: "FastFlags", path: "/docs/guide/fastflags" },
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  style={{ fill: "#FFFFFF" }}
                >
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <a href="https://discord.gg/BeCRubaU" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  height="24"
                  width="24"
                  viewBox="0 0 512 365.467"
                >
                  <path
                    fill="#fff"
                    d="M378.186 365.028s-15.794-18.865-28.956-35.099c57.473-16.232 79.41-51.77 79.41-51.77-17.989 11.846-35.099 20.182-50.454 25.885-21.938 9.213-42.997 14.917-63.617 18.866-42.118 7.898-80.726 5.703-113.631-.438-25.008-4.827-46.506-11.407-64.494-18.867-10.091-3.947-21.059-8.774-32.027-14.917-1.316-.877-2.633-1.316-3.948-2.193-.877-.438-1.316-.878-1.755-.878-7.898-4.388-12.285-7.458-12.285-7.458s21.06 34.659 76.779 51.331c-13.163 16.673-29.395 35.977-29.395 35.977C36.854 362.395 0 299.218 0 299.218 0 159.263 63.177 45.633 63.177 45.633 126.354-1.311 186.022.005 186.022.005l4.388 5.264C111.439 27.645 75.461 62.305 75.461 62.305s9.653-5.265 25.886-12.285c46.945-20.621 84.236-25.885 99.592-27.64 2.633-.439 4.827-.878 7.458-.878 26.763-3.51 57.036-4.387 88.624-.878 41.68 4.826 86.43 17.111 132.058 41.68 0 0-34.66-32.906-109.244-55.281l6.143-7.019s60.105-1.317 122.844 45.628c0 0 63.178 113.631 63.178 253.585 0-.438-36.854 62.739-133.813 65.81l-.001.001zm-43.874-203.133c-25.006 0-44.75 21.498-44.75 48.262 0 26.763 20.182 48.26 44.75 48.26 25.008 0 44.752-21.497 44.752-48.26 0-26.764-20.182-48.262-44.752-48.262zm-160.135 0c-25.008 0-44.751 21.498-44.751 48.262 0 26.763 20.182 48.26 44.751 48.26 25.007 0 44.75-21.497 44.75-48.26.439-26.763-19.742-48.262-44.75-48.262z"
                  />
                </svg>
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
          className="hidden xl:flex fixed top-16 z-30 h-[calc(100vh-4rem)] w-64 border-l border-border bg-sidebar p-6 overflow-y-auto"
          style={{ right: `${SCROLLBAR_WIDTH_PX}px` }}
        >
          <div className="w-full">
            <TableOfContents />
          </div>
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
        <div className="ml-0 md:ml-64 h-[calc(100vh-4rem)]">
          <main
            ref={mainScrollRef}
            className="pt-4 pl-4 pr-8 overflow-y-auto no-scrollbar"
            style={{ 
              WebkitOverflowScrolling: "touch", 
              height: "100%",
              marginRight: `${TOC_WIDTH_PX + SCROLLBAR_WIDTH_PX}px`
            }}
          >
            <div className="max-w-4xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
