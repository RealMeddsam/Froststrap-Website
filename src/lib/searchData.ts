export interface SearchResult {
  title: string;
  path: string;
  section?: string;
  anchor?: string;
  content: string;
}

export const searchableContent: SearchResult[] = [
  {
    title: "Welcome",
    path: "/docs",
    content: "Welcome to Froststrap documentation. Fast lightweight customizable safe secure well documented",
  },
  {
    title: "What is Froststrap?",
    path: "/docs/what-is-froststrap",
    content: "Froststrap is a Bloxstrap/Fishstrap fork, made to give a bunch of extra feature",
  },
  {
    title: "FAQ",
    path: "/docs/faq",
    content: "Frequently asked questions safe install customize appearance operating systems bug report feature request free open source",
  },
  {
    title: "Installation",
    path: "/docs/guide/installation",
    content: "Installation guide download .NET Framework",
  },
  {
    title: "Installation - System Requirements",
    path: "/docs/guide/installation",
    section: "System Requirements",
    anchor: "system-requirements",
    content: "Windows 10+ and .NET Framework 8.0",
  },
  {
    title: "Installation - Download",
    path: "/docs/guide/installation",
    section: "Download",
    anchor: "download",
    content: "Download latest version GitHub releases official",
  },
  {
    title: "Troubleshooting",
    path: "/docs/help/troubleshooting",
    content: "Troubleshooting common issues won't start configuration not saving performance visual glitches",
  },
  {
    title: "Troubleshooting - Won't Start",
    path: "/docs/help/troubleshooting",
    section: "Froststrap won't start",
    anchor: "froststrap-wont-start",
    content: ".NET Framework antivirus administrator reinstall",
  },
  {
    title: "Troubleshooting - Configuration Issues",
    path: "/docs/help/troubleshooting",
    section: "Configuration not saving",
    anchor: "configuration-not-saving",
    content: "Write permissions read-only reset default settings",
  },
  {
    title: "Troubleshooting - Performance",
    path: "/docs/help/troubleshooting",
    section: "Performance issues",
    anchor: "performance-issues",
    content: "Disable features reduce visual effects close applications update version",
  },
  {
    title: "Support",
    path: "/docs/help/support",
    content: "Support help GitHub issues Discord community email documentation contributing",
  },
];

export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return searchableContent
    .filter((item) => {
      const searchText = `${item.title} ${item.content} ${item.section || ""}`.toLowerCase();
      return searchText.includes(lowerQuery);
    })
    .slice(0, 8); // Limit to 8 results
};
