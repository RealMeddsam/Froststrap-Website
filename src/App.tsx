import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DocsLayout } from "./components/DocsLayout";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import WhatIsFroststrap from "./pages/WhatIsFroststrap";
import FAQ from "./pages/FAQ";
import Installation from "./pages/guide/Installation";
import Features from "./pages/guide/Features";
import Troubleshooting from "./pages/help/Troubleshooting";
import Support from "./pages/help/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Welcome />} />
              <Route path="what-is-froststrap" element={<WhatIsFroststrap />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="guide/installation" element={<Installation />} />
              <Route path="guide/features" element={<Features />} />
              <Route path="help/troubleshooting" element={<Troubleshooting />} />
              <Route path="help/support" element={<Support />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
