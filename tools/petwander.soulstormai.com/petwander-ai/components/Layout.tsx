import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Map, FileText, Heart, ShieldPlus, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Trips', icon: Map, path: '/planner' },
    { name: 'Health', icon: Heart, path: '/health' },
    { name: 'Profile', icon: FileText, path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30 px-4 py-3 flex justify-between items-center transition-colors">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            P
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            PetWander
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={logout}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>

          {location.pathname !== '/premium' && (
            <NavLink 
              to="/premium" 
              className="hidden sm:flex text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full items-center shadow-sm hover:shadow-md transition-all"
            >
              <ShieldPlus className="w-3 h-3 mr-1" />
              Pro
            </NavLink>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 max-w-3xl">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-20 md:max-w-3xl md:mx-auto md:rounded-t-2xl md:shadow-[0_-5px_20px_rgba(0,0,0,0.2)] transition-colors">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 transition-colors ${
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;