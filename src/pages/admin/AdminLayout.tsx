import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Menu, X, Shield, Briefcase, Landmark } from 'lucide-react';
import { getCurrentRole, getTokenPayload } from '@/lib/auth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = getCurrentRole();
  const me = getTokenPayload();

  const handleLogout = () => {
    localStorage.removeItem('fromagerie_admin_token');
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true, roles: ['admin', 'commercial'] },
    { to: '/admin/produits', label: 'Produits', icon: <Package size={18} />, end: false, roles: ['admin'] },
    { to: '/admin/commandes', label: 'Commandes', icon: <ShoppingBag size={18} />, end: false, roles: ['admin', 'commercial'] },
    { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <Users size={18} />, end: false, roles: ['admin'] },
    { to: '/admin/caisse', label: 'Caisse', icon: <Landmark size={18} />, end: false, roles: ['admin', 'commercial'] },
  ].filter(item => role && item.roles.includes(role));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/10">
        <p className="font-bold text-lg text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
          Fromagerie Alioui
        </p>
        <p className="text-xs text-white/50 mt-0.5">Administration</p>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        {/* Current user badge */}
        <div className="px-4 py-2.5 mb-1 rounded-xl bg-white/5">
          <div className="flex items-center gap-2">
            {role === 'admin'
              ? <Shield size={13} className="text-emerald-400 flex-shrink-0" />
              : <Briefcase size={13} className="text-blue-400 flex-shrink-0" />}
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{me?.username}</p>
              <p className={`text-[10px] font-semibold ${role === 'admin' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {role === 'admin' ? 'Administrateur' : 'Commercial'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-shrink-0 flex-col"
        style={{ background: 'linear-gradient(160deg, #1B3A2D 0%, #0E1A15 100%)' }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-56 z-50 flex flex-col md:hidden"
            style={{ background: 'linear-gradient(160deg, #1B3A2D 0%, #0E1A15 100%)' }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <p className="font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin
          </p>
          <span className={`ml-auto text-[10px] font-bold px-2 py-1 rounded-full ${
            role === 'admin' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {role === 'admin' ? 'Admin' : 'Commercial'}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
