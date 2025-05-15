import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import { supabase } from './supabase';

// Placeholder components for routes that will be implemented later
const ClientsPage = () => <div className="p-4">Clients page will be implemented here</div>;
const RecipesPage = () => <div className="p-4">Recipes page will be implemented here</div>;
const IngredientsPage = () => <div className="p-4">Ingredients page will be implemented here</div>;
const MenusPage = () => <div className="p-4">Menus page will be implemented here</div>;
const SettingsPage = () => <div className="p-4">Settings page will be implemented here</div>;

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-neutral-600">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user, isLoading } = useAuthStore();
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Check if user is authenticated on app load
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.user) {
        // Fetch nutritionist profile
        const { data: nutritionistData } = await supabase
          .from('nutritionists')
          .select('*')
          .eq('user_id', data.session.user.id)
          .single();
          
        if (nutritionistData) {
          useAuthStore.setState({
            user: {
              id: data.session.user.id,
              email: data.session.user.email || '',
            },
            nutritionist: nutritionistData,
          });
        }
      }
      
      setAppIsReady(true);
    };
    
    checkSession();
  }, []);
  
  if (!appIsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-neutral-600">Loading application...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!user ? <RegisterForm /> : <Navigate to="/dashboard" replace />} />
        
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route path="menus" element={<MenusPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;