
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import LostFound from "./components/LostFound";
import Events from "./components/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lost-found" element={<LostFound />} />
            <Route path="/events" element={<Events />} />
            <Route path="/queues" element={<div className="p-8"><h1 className="text-2xl">Queues - Coming Soon</h1></div>} />
            <Route path="/complaints" element={<div className="p-8"><h1 className="text-2xl">Complaints - Coming Soon</h1></div>} />
            <Route path="/contacts" element={<div className="p-8"><h1 className="text-2xl">Contacts - Coming Soon</h1></div>} />
            <Route path="/map" element={<div className="p-8"><h1 className="text-2xl">Campus Map - Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
