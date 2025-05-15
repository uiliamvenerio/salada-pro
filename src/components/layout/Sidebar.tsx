import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Carrot, 
  UtensilsCrossed, 
  Calendar, 
  Settings, 
  LogOut,
  Salad
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Sidebar: React.FC = () => {
  const { signOut, nutritionist } = useAuthStore();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/clients', label: 'Clients', icon: <Users size={20} /> },
    { to: '/recipes', label: 'Recipes', icon: <UtensilsCrossed size={20} /> },
    { to: '/ingredients', label: 'Ingredients', icon: <Carrot size={20} /> },
    { to: '/menus', label: 'Menus', icon: <Calendar size={20} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const baseNavClasses = "flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200 font-medium";
  const activeNavClasses = "bg-primary-50 text-primary-700";
  const inactiveNavClasses = "text-neutral-600 hover:bg-neutral-100";

  return (
    <aside className="h-screen w-64 border-r border-neutral-200 bg-white flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <Salad className="text-primary-500" size={28} />
          <h1 className="text-xl font-bold text-primary-700">NutriPro</h1>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `${baseNavClasses} ${isActive ? activeNavClasses : inactiveNavClasses}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-neutral-200">
        <div className="mb-4 p-3 bg-neutral-50 rounded-md">
          <p className="text-sm font-medium text-neutral-700 truncate">
            {nutritionist?.name || 'User'}
          </p>
          <p className="text-xs text-neutral-500 truncate">
            {nutritionist?.email || ''}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-2 w-full text-error-600 hover:bg-error-50 rounded-md transition-colors duration-200"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;