
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
import Queue from "./components/Queue";
import Complaints from "./components/Complaints"
import ContactsPage from "./components/Contacts";
import CampusMapPage from "./components/Map";

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
            <Route path="/queues" element={<Queue/>} />
            <Route path="/complaints" element={ <Complaints/> } />
            <Route path="/contacts" element={<ContactsPage/>} />
            <Route path="/map" element={ <CampusMapPage/> } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
