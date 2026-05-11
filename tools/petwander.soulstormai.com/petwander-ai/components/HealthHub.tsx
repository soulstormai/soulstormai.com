import React, { useState } from 'react';
import { Plus, AlertTriangle, Calendar, FileCheck, X, Syringe } from 'lucide-react';
import { VaccineRecord } from '../types';

const HealthHub: React.FC = () => {
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([
    { id: '1', name: 'Rabies', dateGiven: '2024-01-10', expiryDate: '2025-01-10', status: 'Valid' },
    { id: '2', name: 'DHPP', dateGiven: '2023-05-15', expiryDate: '2024-05-15', status: 'Expiring Soon' },
  ]);

  const [vetVisitDate, setVetVisitDate] = useState('2025-06-12');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    dateGiven: '',
    expiryDate: ''
  });

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVaccine.name || !newVaccine.dateGiven || !newVaccine.expiryDate) return;

    const expiry = new Date(newVaccine.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    let status: 'Valid' | 'Expiring Soon' | 'Expired' = 'Valid';
    if (daysUntilExpiry < 0) status = 'Expired';
    else if (daysUntilExpiry < 30) status = 'Expiring Soon';

    const record: VaccineRecord = {
        id: Date.now().toString(),
        name: newVaccine.name,
        dateGiven: newVaccine.dateGiven,
        expiryDate: newVaccine.expiryDate,
        status: status
    };

    setVaccines([record, ...vaccines]);
    setNewVaccine({ name: '', dateGiven: '', expiryDate: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Health Hub</h1>
        <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
        >
            <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="w-full mr-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Next Vet Visit</p>
              <input 
                  type="date"
                  value={vetVisitDate}
                  onChange={(e) => setVetVisitDate(e.target.value)}
                  className="font-bold text-lg text-slate-800 dark:text-white bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:outline-none w-full pb-1"
              />
          </div>
          <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 shrink-0">
              <Calendar className="w-6 h-6" />
          </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Vaccine Records</h3>
        {vaccines.map((vac) => (
            <div key={vac.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${
                        vac.status === 'Valid' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : vac.status === 'Expiring Soon'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                        <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{vac.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Expires: {vac.expiryDate}</p>
                    </div>
                </div>
                {vac.status === 'Expiring Soon' && (
                    <div className="flex flex-col items-end">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">Renew Soon</span>
                    </div>
                )}
                {vac.status === 'Expired' && (
                     <div className="flex flex-col items-end">
                        <AlertTriangle className="w-4 h-4 text-red-500 mb-1" />
                        <span className="text-[10px] text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">Expired</span>
                    </div>
                )}
            </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-purple-500/20">
          <div className="relative z-10">
              <h3 className="font-bold text-lg">Digital Health Certificate</h3>
              <p className="text-white/80 text-xs mt-1 max-w-[80%] leading-relaxed">Generate an official-looking PDF summary of your pet's vaccines for boarding or border checks.</p>
              <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Generate PDF
              </button>
          </div>
          <FileCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
      </div>

      {/* Add Vaccine Modal */}
      {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add Vaccine</h2>
                      <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                          <X className="w-6 h-6" />
                      </button>
                  </div>
                  
                  <form onSubmit={handleAddVaccine} className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Vaccine Name</label>
                          <div className="relative mt-1">
                              <Syringe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                  type="text" 
                                  placeholder="e.g. Rabies"
                                  value={newVaccine.name}
                                  onChange={(e) => setNewVaccine({...newVaccine, name: e.target.value})}
                                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700"
                                  required
                              />
                          </div>
                      </div>
                      
                      <div>
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date Given</label>
                          <div className="relative mt-1">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                  type="date" 
                                  value={newVaccine.dateGiven}
                                  max={new Date().toISOString().split('T')[0]}
                                  onChange={(e) => setNewVaccine({...newVaccine, dateGiven: e.target.value})}
                                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700"
                                  required
                              />
                          </div>
                      </div>
                      
                      <div>
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Expiry Date</label>
                          <div className="relative mt-1">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                  type="date" 
                                  value={newVaccine.expiryDate}
                                  min={newVaccine.dateGiven}
                                  onChange={(e) => setNewVaccine({...newVaccine, expiryDate: e.target.value})}
                                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700"
                                  required
                              />
                          </div>
                      </div>
                      
                      <button 
                          type="submit" 
                          className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                      >
                          Save Record
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default HealthHub;