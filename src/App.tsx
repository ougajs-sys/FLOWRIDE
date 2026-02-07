import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Offres from "./pages/clients/Offres";
import Vehicules from "./pages/clients/Vehicules";
import Devis from "./pages/clients/Devis";
import Programme from "./pages/partenaires/Programme";
import Candidature from "./pages/partenaires/Candidature";
import Dashboard from "./pages/admin/Dashboard";
import Prospects from "./pages/admin/Prospects";
import Agences from "./pages/admin/Agences";
import AdminVehicules from "./pages/admin/Vehicules";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/clients/offres" element={<Offres />} />
           <Route path="/clients/vehicules" element={<Vehicules />} />
           <Route path="/clients/devis" element={<Devis />} />
           <Route path="/partenaires/programme" element={<Programme />} />
           <Route path="/partenaires/candidature" element={<Candidature />} />
           <Route path="/admin" element={<Dashboard />} />
           <Route path="/admin/prospects" element={<Prospects />} />
           <Route path="/admin/agences" element={<Agences />} />
           <Route path="/admin/vehicules" element={<AdminVehicules />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
