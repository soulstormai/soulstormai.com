import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Mail, Lock, ArrowRight, User as UserIcon } from 'lucide-react';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isSignUp && !name) return;
    
    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, name);
      } else {
        await login(email);
      }
      // Navigation handled by useEffect when user state updates
    } catch (error) {
      console.error(error);
      alert("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 space-y-8 border border-slate-100 dark:border-slate-800">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-primary-500/30">
            <PawPrint size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isSignUp ? 'Create Account' : 'Welcome back!'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isSignUp ? 'Start your journey with PetWander.' : 'Login to plan your next pet adventure.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  placeholder="Your Name"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                placeholder="hello@petwander.ai"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              'Processing...'
            ) : (
              <span className="flex items-center">
                {isSignUp ? 'Sign Up' : 'Login'} <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          {isSignUp ? 'Already have an account? ' : 'New here? '}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary-500 font-bold cursor-pointer hover:underline focus:outline-none"
          >
            {isSignUp ? 'Login' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;