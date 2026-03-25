import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import QuiSommesNous from "./pages/QuiSommesNous";
import NosFromages from "./pages/NosFromages";
import IdeesRecettes from "./pages/IdeesRecettes";
import ContactezNous from "./pages/ContactezNous";
import NotFound from "./pages/NotFound";
import Panier from "./pages/Panier";
import Commande from "./pages/Commande";
import ConfirmationCommande from "./pages/ConfirmationCommande";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCaisse from "./pages/admin/AdminCaisse";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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
        <Route path="/panier" element={<Panier />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/confirmation/:orderNumber" element={<ConfirmationCommande />} />
<Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin routes — no Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="produits" element={<AdminProducts />} />
              <Route path="produits/nouveau" element={<AdminProductForm />} />
              <Route path="produits/:id" element={<AdminProductForm />} />
              <Route path="commandes" element={<AdminOrders />} />
              <Route path="utilisateurs" element={<AdminUsers />} />
              <Route path="caisse" element={<AdminCaisse />} />
            </Route>

            {/* Public routes — with Navbar/Footer */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <main>
                    <AnimatedRoutes />
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
