import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import QuiSommesNous from "./pages/QuiSommesNous";
import NosFromages from "./pages/NosFromages";
import IdeesRecettes from "./pages/IdeesRecettes";
import ContactezNous from "./pages/ContactezNous";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Accueil />} />
        <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
        <Route path="/nos-fromages" element={<NosFromages />} />
        <Route path="/idees-recettes" element={<IdeesRecettes />} />
        <Route path="/contactez-nous" element={<ContactezNous />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
