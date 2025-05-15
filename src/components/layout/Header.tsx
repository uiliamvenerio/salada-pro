import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/clients')) {
      if (path.includes('/new')) return 'New Client';
      if (path.match(/\/clients\/[a-zA-Z0-9-]+$/)) return 'Client Details';
      return 'Clients';
    }
    if (path.includes('/recipes')) {
      if (path.includes('/new')) return 'New Recipe';
      if (path.match(/\/recipes\/[a-zA-Z0-9-]+$/)) return 'Recipe Details';
      return 'Recipes';
    }
    if (path.includes('/ingredients')) {
      if (path.includes('/new')) return 'New Ingredient';
      if (path.match(/\/ingredients\/[a-zA-Z0-9-]+$/)) return 'Ingredient Details';
      return 'Ingredients';
    }
    if (path.includes('/menus')) {
      if (path.includes('/new')) return 'New Menu';
      if (path.match(/\/menus\/[a-zA-Z0-9-]+$/)) return 'Menu Details';
      return 'Menus';
    }
    if (path.includes('/settings')) return 'Settings';
    
    return 'NutriPro';
  };

  return (
    <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between">
      <h1 className="text-xl font-medium text-neutral-800">{getPageTitle()}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 w-64 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-opacity-50 focus:outline-none transition-colors duration-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
        </div>
        
        <button className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors duration-200">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;