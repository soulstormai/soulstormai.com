import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PetProfile from './components/PetProfile';
import TripPlanner from './components/TripPlanner';
import HealthHub from './components/HealthHub';
import Premium from './components/Premium';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useCodeProtection } from './hooks/useCodeProtection';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<PetProfile />} />
          <Route path="planner" element={<TripPlanner />} />
          <Route path="health" element={<HealthHub />} />
        </Route>
        <Route path="/premium" element={<Premium />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  // 🔒 Enable code protection in production
  useCodeProtection();

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;