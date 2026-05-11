import React, { useState } from 'react';
import { CreditCard, Check, X, Sparkles } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, userEmail = '' }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleUpgrade = async () => {
    setLoading(true);
    
    try {
      // Call API endpoint to create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan: selectedPlan,
          email: userEmail || 'guest@petwander.app',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout using the session URL
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const features = [
    'Unlimited saved trips',
    'Up to 5 pet profiles',
    'Detailed AI itineraries',
    'Unlimited country regulations',
    'PDF health certificates',
    'Priority AI responses',
    'Offline mode for travel',
    'Email support',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Upgrade to Premium</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Plan Selector */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Monthly</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-white">$9.99</div>
              <div className="text-xs text-slate-500 mt-1">per month</div>
            </button>

            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all relative ${
                selectedPlan === 'yearly'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                Save 33%
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Yearly</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-white">$79.99</div>
              <div className="text-xs text-slate-500 mt-1">per year • $6.67/month</div>
            </button>
          </div>

          {/* Features List */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              Everything in Premium:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                {selectedPlan === 'monthly' ? 'Subscribe for $9.99/mo' : 'Subscribe for $79.99/yr'}
              </>
            )}
          </button>

          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              🔒 Secure payment powered by Stripe
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;