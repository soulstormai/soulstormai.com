import React, { useState, useEffect } from 'react';
import { Search, MapPin, Plane, Info, ExternalLink, CloudSun, CheckCircle2, Circle, Calendar, BedDouble, PlaneTakeoff, Globe, FileWarning, ShieldCheck, Phone, Ban, Stethoscope, Save, Trash2, FolderOpen, ArrowRight } from 'lucide-react';
import { planTrip, getCountryRegulations } from '../services/geminiService';
import { Itinerary, TravelRecommendation, CountryRegulations } from '../types';
import { useAuth } from '../context/AuthContext';
import { canUseFeature, incrementUsage, decrementUsage, getDaysUntilReset } from '../services/usageService';
import UsageLimitModal from './UsageLimitModal';

const TripPlanner: React.FC = () => {
  const { user } = useAuth();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchType, setSearchType] = useState<'trip' | 'hotel' | 'regulations' | 'saved'>('trip');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [regulations, setRegulations] = useState<CountryRegulations | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitModalData, setLimitModalData] = useState({ featureName: '', limit: 0, remaining: 0 });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const saved = localStorage.getItem('petwander_saved_trips');
    if (saved) {
      try {
        setSavedItineraries(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved trips", e);
      }
    }
  }, []);

  const handleSaveItinerary = () => {
    if (!itinerary) return;

    // Check for duplicates based on ID
    if (savedItineraries.some(i => i.id === itinerary.id)) {
        alert("This itinerary is already saved.");
        return;
    }

    // Check saved trips limit for free users
    const saveCheck = canUseFeature('savedTrips', user?.isPremium || false);
    if (!saveCheck.allowed) {
      setLimitModalData({
        featureName: 'saved trips',
        limit: saveCheck.limit,
        remaining: saveCheck.remaining,
      });
      setShowLimitModal(true);
      return;
    }

    const newSaved = [itinerary, ...savedItineraries];
    setSavedItineraries(newSaved);
    localStorage.setItem('petwander_saved_trips', JSON.stringify(newSaved));
    incrementUsage('savedTrips');
    alert("Itinerary saved successfully!");
  };

  const handleDeleteTrip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Delete this saved trip?")) {
        const newSaved = savedItineraries.filter(i => i.id !== id);
        setSavedItineraries(newSaved);
        localStorage.setItem('petwander_saved_trips', JSON.stringify(newSaved));
        decrementUsage('savedTrips');
    }
  };

  const handleLoadTrip = (trip: Itinerary) => {
    setItinerary(trip);
    setDestination(trip.destination);
    if (trip.startDate) setStartDate(trip.startDate);
    if (trip.endDate) setEndDate(trip.endDate);
    setSearchType('trip');
    setRegulations(null);
  };

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    if (searchType !== 'regulations' && (!startDate || !endDate)) return;

    const isPremium = user?.isPremium || false;

    // Check usage limits for free users
    if (searchType === 'regulations') {
      const regulationsCheck = canUseFeature('countryLookups', isPremium);
      if (!regulationsCheck.allowed) {
        setLimitModalData({
          featureName: 'country lookups',
          limit: regulationsCheck.limit,
          remaining: regulationsCheck.remaining,
        });
        setShowLimitModal(true);
        return;
      }
    } else {
      const tripCheck = canUseFeature('tripPlans', isPremium);
      if (!tripCheck.allowed) {
        setLimitModalData({
          featureName: 'trip plans',
          limit: tripCheck.limit,
          remaining: tripCheck.remaining,
        });
        setShowLimitModal(true);
        return;
      }
    }

    setLoading(true);
    setItinerary(null);
    setRegulations(null);

    try {
      if (searchType === 'regulations') {
        const result = await getCountryRegulations(destination, "Mixed breed dog, 25lbs", isPremium);
        setRegulations(result);
        incrementUsage('countryLookups');
      } else {
        const result = await planTrip(destination, startDate, endDate, "Mixed breed dog, 25lbs", searchType === 'saved' ? 'trip' : searchType, isPremium);
        setItinerary(result);
        incrementUsage('tripPlans');
      }
    } catch (err) {
      alert("Could not fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (index: number) => {
    if (!itinerary) return;
    const newRecommendations = [...itinerary.recommendations];
    newRecommendations[index].checked = !newRecommendations[index].checked;
    
    // Update state
    const updatedItinerary = { ...itinerary, recommendations: newRecommendations };
    setItinerary(updatedItinerary);

    // If this itinerary is currently saved, update it in storage too to persist checkmarks
    if (savedItineraries.some(i => i.id === updatedItinerary.id)) {
        const newSaved = savedItineraries.map(i => i.id === updatedItinerary.id ? updatedItinerary : i);
        setSavedItineraries(newSaved);
        localStorage.setItem('petwander_saved_trips', JSON.stringify(newSaved));
    }
  };

  const RecommendationCard: React.FC<{ item: TravelRecommendation; index: number }> = ({ item, index }) => (
    <div 
        onClick={() => toggleCheck(index)}
        className={`bg-white dark:bg-slate-900 p-4 rounded-xl border ${item.checked ? 'border-primary-500 ring-1 ring-primary-500 dark:border-primary-500' : 'border-slate-100 dark:border-slate-800'} shadow-sm flex flex-col space-y-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
            {item.checked ? <CheckCircle2 className="w-5 h-5 text-primary-500" /> : <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                item.category === 'Hotel' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                item.category === 'Activity' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                item.category === 'Vet' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
                {item.category === 'Vet' ? <span className="flex items-center"><Stethoscope className="w-3 h-3 mr-1"/> Emergency Vet</span> : item.category}
            </span>
        </div>
        <div className="flex items-center space-x-2">
            {item.priceLevel && <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.priceLevel}</span>}
            {item.rating && <span className="text-xs font-semibold text-amber-500">★ {item.rating}</span>}
        </div>
      </div>
      <h4 className={`font-bold ${item.checked ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'}`}>{item.title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>
      
      {item.sources && item.sources.length > 0 && (
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800 mt-2">
             <p className="text-[10px] text-slate-400 mb-1">Verified via:</p>
             <div className="flex flex-wrap gap-2">
                 {item.sources.map((source, i) => (
                     <a key={i} href={source.uri} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center text-[10px] text-primary-500 hover:underline">
                         {source.title.substring(0, 15)}... <ExternalLink className="w-2 h-2 ml-1" />
                     </a>
                 ))}
             </div>
          </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pb-12">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Plan a Trip</h1>

      {/* Mode Toggle */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl overflow-x-auto">
        <button 
            onClick={() => setSearchType('trip')}
            className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center justify-center transition-all ${
                searchType === 'trip' 
                ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
        >
            <PlaneTakeoff className="w-4 h-4 mr-1 sm:mr-2" /> Itinerary
        </button>
        <button 
            onClick={() => setSearchType('hotel')}
            className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center justify-center transition-all ${
                searchType === 'hotel' 
                ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
        >
            <BedDouble className="w-4 h-4 mr-1 sm:mr-2" /> Hotels
        </button>
        <button 
            onClick={() => setSearchType('regulations')}
            className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center justify-center transition-all ${
                searchType === 'regulations' 
                ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
        >
            <Globe className="w-4 h-4 mr-1 sm:mr-2" /> Int'l Rules
        </button>
        <button 
            onClick={() => setSearchType('saved')}
            className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center justify-center transition-all ${
                searchType === 'saved' 
                ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
        >
            <FolderOpen className="w-4 h-4 mr-1 sm:mr-2" /> Saved
        </button>
      </div>

      {/* SAVED TRIPS LIST */}
      {searchType === 'saved' && (
          <div className="space-y-4 animate-fade-in">
              {savedItineraries.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                      <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>No saved trips yet.</p>
                      <p className="text-xs">Plan a trip and click save to see it here.</p>
                  </div>
              ) : (
                  savedItineraries.map((trip) => (
                      <div key={trip.id} onClick={() => handleLoadTrip(trip)} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                          <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                                  <Plane className="w-5 h-5" />
                              </div>
                              <div>
                                  <h3 className="font-bold text-slate-800 dark:text-white">{trip.destination}</h3>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">{trip.dates}</p>
                              </div>
                          </div>
                          <button 
                              onClick={(e) => handleDeleteTrip(trip.id, e)}
                              className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                              <Trash2 className="w-5 h-5" />
                          </button>
                      </div>
                  ))
              )}
          </div>
      )}

      {/* Search Input (Hidden when viewing saved) */}
      {searchType !== 'saved' && (
        <form onSubmit={handlePlanTrip} className="space-y-3">
            <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={searchType === 'regulations' ? "Enter Country (e.g. Japan, UK)" : "Where are you going? (e.g. Paris)"}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-colors"
                />
            </div>

            {searchType !== 'regulations' && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input 
                            type="date" 
                            value={startDate}
                            min={today}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input 
                            type="date" 
                            value={endDate}
                            min={startDate || today}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>
                </div>
            )}

            <button
            type="submit"
            disabled={loading || !destination}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 flex items-center justify-center"
            >
            {loading ? 'Searching...' : (
                searchType === 'hotel' ? <><Search className="w-5 h-5 mr-2" /> Find Pet-Friendly Hotels</> :
                searchType === 'regulations' ? <><ShieldCheck className="w-5 h-5 mr-2" /> Check Entry Laws</> :
                <><Search className="w-5 h-5 mr-2" /> Plan Full Trip</>
            )}
            </button>
        </form>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
      )}

      {/* REGULATIONS RESULTS */}
      {regulations && !loading && searchType !== 'saved' && (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-slate-900 dark:bg-black rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">{regulations.country}</h2>
                        <p className="text-slate-400 text-sm">International Entry Guide</p>
                    </div>
                    <Globe className="w-10 h-10 text-primary-500" />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{regulations.summary}</p>
                {regulations.emergencyContacts && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-red-400">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm font-bold">{regulations.emergencyContacts}</span>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" /> Entry Requirements
                </h3>
                <ul className="space-y-3">
                    {regulations.entryRequirements.map((req, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {req}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/30">
                    <h3 className="font-bold text-lg mb-3 text-amber-800 dark:text-amber-500 flex items-center">
                        <FileWarning className="w-5 h-5 mr-2" /> Documents
                    </h3>
                    <ul className="space-y-2">
                        {regulations.documentsRequired.map((doc, i) => (
                            <li key={i} className="text-sm text-amber-900 dark:text-amber-100 font-medium">
                                • {doc}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-rose-50 dark:bg-rose-900/10 rounded-3xl p-6 border border-rose-100 dark:border-rose-900/30">
                    <h3 className="font-bold text-lg mb-3 text-rose-800 dark:text-rose-500 flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-2" /> Restricted / Quarantine
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Banned Breeds</p>
                    <p className="text-sm text-rose-900 dark:text-rose-100 mb-4">
                        {regulations.bannedBreeds.length > 0 ? regulations.bannedBreeds.join(", ") : "None specifically listed (check local laws)."}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Quarantine</p>
                    <p className="text-sm text-rose-900 dark:text-rose-100">
                        {regulations.quarantineInfo}
                    </p>
                </div>
            </div>
            
            {(regulations.prohibitedItems && regulations.prohibitedItems.length > 0) && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200 flex items-center">
                        <Ban className="w-5 h-5 mr-2 text-red-500" /> Prohibited Items
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {regulations.prohibitedItems.map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-white dark:bg-slate-700 text-xs font-medium rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="bg-primary-50 dark:bg-primary-900/10 rounded-3xl p-6 border border-primary-100 dark:border-primary-900/30">
                 <h3 className="font-bold text-lg mb-2 text-primary-800 dark:text-primary-400 flex items-center">
                    <Plane className="w-5 h-5 mr-2" /> Airline Tips
                </h3>
                <p className="text-sm text-primary-900 dark:text-primary-100 leading-relaxed">
                    {regulations.airlineTips}
                </p>
            </div>
        </div>
      )}

      {/* ITINERARY RESULTS */}
      {itinerary && !loading && searchType !== 'saved' && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Weather & Alerts */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-white shadow-lg shadow-primary-500/20 relative overflow-hidden">
            <div className="flex items-start justify-between relative z-10">
                <div>
                    <h2 className="text-xl font-bold">{itinerary.destination}</h2>
                    <p className="text-primary-100 text-sm mt-1">{itinerary.dates}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <CloudSun className="w-8 h-8 text-white/80" />
                    <button 
                        onClick={handleSaveItinerary}
                        className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center transition-colors backdrop-blur-sm"
                    >
                        <Save className="w-3 h-3 mr-1" /> Save
                    </button>
                </div>
            </div>
            {itinerary.weatherAlert && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm border border-white/20 relative z-10">
                    <p className="font-medium flex items-center"><Info className="w-4 h-4 mr-2" /> Weather Advice</p>
                    <p className="mt-1 opacity-90 text-xs leading-relaxed">{itinerary.weatherAlert}</p>
                </div>
            )}
          </div>

          {/* Airline Policies - Only show if present */}
          {itinerary.airlinePolicy && (
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
                    <Plane className="w-5 h-5 mr-2 text-slate-400" /> 
                    Airline Rules (Real-time)
                </h3>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
                    {itinerary.airlinePolicy}
                </div>
            </div>
          )}

          {/* Places */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-slate-400" /> 
                {searchType === 'hotel' ? 'Top Hotels & Parks' : 'Itinerary Checklist'}
            </h3>
            <div className="grid gap-3">
                {itinerary.recommendations.map((rec, idx) => (
                    <RecommendationCard key={idx} item={rec} index={idx} />
                ))}
            </div>
          </div>

        </div>
      )}

      {/* Usage Limit Modal */}
      <UsageLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        featureName={limitModalData.featureName}
        limit={limitModalData.limit}
        remaining={limitModalData.remaining}
        daysUntilReset={getDaysUntilReset()}
      />
    </div>
  );
};

export default TripPlanner;