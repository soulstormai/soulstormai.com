import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Camera, Heart, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name : 'Traveler';

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Hello, <span className="text-primary-600 dark:text-primary-400">{firstName}!</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Ready to explore the world with your best friend?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/planner" className="col-span-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-6 text-white shadow-lg shadow-primary-500/20 group relative overflow-hidden transition-transform active:scale-[0.98]">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <Map className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Plan a Trip</h2>
            <p className="text-primary-100 text-sm mt-1 max-w-[80%]">Find pet-friendly hotels, check airline rules & fly safe.</p>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
             <ArrowRight className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </Link>

        <Link to="/profile" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:bg-slate-800 transition-all group active:scale-[0.98]">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-3 text-orange-600 dark:text-orange-400">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-white">Pet ID</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Scan for tips.</p>
        </Link>

        <Link to="/health" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:bg-slate-800 transition-all active:scale-[0.98]">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-3 text-red-600 dark:text-red-400">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-white">Health</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Vaccine log.</p>
        </Link>
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex justify-between items-center">
            <div>
                <div className="flex items-center space-x-2 mb-2 text-amber-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Premium</span>
                </div>
                <h3 className="font-bold text-lg">Unlimited Saves</h3>
                <p className="text-slate-400 text-xs mt-1">Offline maps & flight alerts.</p>
            </div>
            <Link to="/premium" className="bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                Upgrade
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;