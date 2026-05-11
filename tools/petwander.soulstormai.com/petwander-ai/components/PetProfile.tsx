import React, { useState, useRef } from 'react';
import { Camera, Sparkles, Upload, PawPrint, Syringe } from 'lucide-react';
import { analyzePetPhoto } from '../services/geminiService';
import { PetProfile as IPetProfile } from '../types';

const PetProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IPetProfile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      try {
        const analysis = await analyzePetPhoto(base64String);
        
        setProfile({
          id: '1',
          name: 'Buddy', 
          age: 'Unknown',
          weight: 'Unknown',
          imageUri: reader.result as string,
          breed: analysis.breed || 'Unknown Mix',
          travelTips: analysis.travelTips || [],
          suggestedVaccines: analysis.suggestedVaccines || [],
          anxietyLevel: (analysis.anxietyLevel as any) || 'Medium',
        });
      } catch (err) {
        alert('Failed to analyze image. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Pet's Passport</h1>

      {!profile ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-primary-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-primary-500">
            <PawPrint size={40} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Who's traveling?</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Upload a photo to let our AI identify breed-specific travel needs and vaccines.</p>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary-500/30"
          >
            {loading ? (
              <>
                <Sparkles className="animate-spin w-5 h-5 mr-2" /> Analyzing...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" /> Scan Pet Photo
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="h-56 w-full bg-slate-100 dark:bg-slate-800 relative">
                     {profile.imageUri && (
                         <img src={profile.imageUri} alt="Pet" className="w-full h-full object-cover" />
                     )}
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 pt-12">
                         <h2 className="text-white text-3xl font-bold">{profile.name}</h2>
                         <p className="text-white/90 text-sm font-medium">{profile.breed}</p>
                     </div>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Anxiety</p>
                        <p className={`font-bold text-lg ${
                            profile.anxietyLevel === 'High' ? 'text-red-500' : 
                            profile.anxietyLevel === 'Medium' ? 'text-amber-500' : 'text-green-500'
                        }`}>{profile.anxietyLevel}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Vaccines</p>
                        <p className="font-bold text-lg text-green-600 dark:text-green-400">Up to Date</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white">AI Travel Insights</h3>
                </div>
                <ul className="space-y-3">
                    {profile.travelTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>

            {profile.suggestedVaccines && profile.suggestedVaccines.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-2 mb-4">
                        <Syringe className="w-5 h-5 text-rose-500" />
                        <h3 className="font-bold text-slate-800 dark:text-white">Recommended Health Checks</h3>
                    </div>
                    <ul className="space-y-3">
                        {profile.suggestedVaccines.map((vac, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {vac}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <button 
                onClick={() => setProfile(null)}
                className="w-full py-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium transition-colors"
            >
                Scan another pet
            </button>
        </div>
      )}
    </div>
  );
};

export default PetProfile;