
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './components/Navigation';
import Index from "./pages/Index";
import TalentMatchPage from './pages/talent-match/TalentMatchPage';
import AIStudioPage from './pages/ai-studio/AIStudioPage';
import SandboxIDEPage from './pages/sandbox-ide/SandboxIDEPage';
import ProjectConsolePage from './pages/project-console/ProjectConsolePage';
import DeveloperWorkstationPage from './pages/developer-workstation/DeveloperWorkstationPage';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-studio" element={<AIStudioPage />} />
              <Route path="/talent-match" element={<TalentMatchPage />} />
              <Route path="/sandbox" element={<SandboxIDEPage />} />
              <Route path="/project-console" element={<ProjectConsolePage />} />
              <Route path="/developer-workstation" element={<DeveloperWorkstationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
