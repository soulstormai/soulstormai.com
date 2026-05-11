import React, { useState, useEffect } from 'react';
import UpgradeModal from './UpgradeModal';
import { Crown, Check, Zap, Shield, Heart, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Premium: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, updatePremiumStatus } = useAuth();

  useEffect(() => {
    // Check if redirected from successful payment
    // Handle both regular and hash-based routing
    const search = window.location.search || window.location.hash.split('?')[1];
    const urlParams = new URLSearchParams(search);
    if (urlParams.get('success') === 'true') {
      setShowSuccess(true);
      // Mark user as premium
      updatePremiumStatus(true);
      // Clean up URL by removing success parameter
      window.history.replaceState({}, '', window.location.pathname + window.location.hash.split('?')[0]);
    }
  }, [updatePremiumStatus]);

  const freeFeatures = [
    '3 saved trips',
    '1 pet profile',
    'Basic itineraries',
    '3 country lookups/month',
    'Basic health records (3 vaccines)',
  ];

  const premiumFeatures = [
    'Unlimited saved trips',
    'Up to 5 pet profiles',
    'Detailed AI itineraries with more recommendations',
    'Unlimited country regulations lookup',
    'PDF health certificate generation',
    'Priority AI responses (faster)',
    'Offline mode for international travel',
    'Email support',
    'Early access to new features',
  ];

  // If user is already premium, show premium status page
  if (user?.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-start justify-between animate-fade-in">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-800 dark:text-green-200">Welcome to Premium! 🎉</h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your subscription is active. Enjoy unlimited access to all premium features!
                  </p>
                </div>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-green-600 dark:text-green-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Premium Status Card */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Premium Active</h1>
                  <p className="text-white/80">You're all set with unlimited access</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-white/80 text-sm mb-1">Status</div>
                <div className="text-white font-bold">Active</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-white/80 text-sm mb-1">Plan</div>
                <div className="text-white font-bold">Premium Yearly</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-white/80 text-sm mb-1">Price</div>
                <div className="text-white font-bold">$79.99/year</div>
              </div>
            </div>
          </div>

          {/* Premium Features Active */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary-500" />
              Your Premium Features
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {premiumFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manage Subscription */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Need to manage your subscription or billing?
            </p>
            <a
              href="https://billing.stripe.com/p/login/test_00g4hmaZraFrcO4288"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors"
            >
              Manage Subscription
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show upgrade page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 pb-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-3">
            Upgrade to Premium
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Unlock unlimited trips, advanced AI features, and premium support for you and your furry companions
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-slate-800 dark:text-white mb-1">$0</div>
              <div className="text-sm text-slate-500">Forever free</div>
            </div>
            
            <div className="space-y-3 mb-6">
              {freeFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              disabled
              className="w-full py-3 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            
            <div className="text-center mb-6 relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <div className="text-4xl font-bold text-white">$6.67</div>
                <div className="text-white/80 text-sm">/month</div>
              </div>
              <div className="text-sm text-white/80">Billed yearly at $79.99</div>
              <div className="text-xs text-white/70 mt-1">or $9.99/month</div>
            </div>
            
            <div className="space-y-3 mb-6">
              {premiumFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-4 rounded-xl font-bold bg-white text-primary-600 hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Premium Now
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
            <Shield className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Secure Payment</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Powered by Stripe. Your payment info is encrypted and secure.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
            <Heart className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">30-Day Guarantee</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
            <Zap className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Cancel Anytime</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No long-term commitment. Cancel your subscription anytime with one click.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="group">
              <summary className="font-semibold text-slate-800 dark:text-white cursor-pointer list-none flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                Can I upgrade or downgrade anytime?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3 px-4 pb-4">
                Yes! You can upgrade from monthly to yearly (or vice versa) or cancel your subscription at any time from your account settings.
              </p>
            </details>

            <details className="group">
              <summary className="font-semibold text-slate-800 dark:text-white cursor-pointer list-none flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                What happens to my data if I cancel?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3 px-4 pb-4">
                Your data stays safe! You'll revert to the free plan with access to 3 saved trips and 1 pet profile. All your data remains accessible.
              </p>
            </details>

            <details className="group">
              <summary className="font-semibold text-slate-800 dark:text-white cursor-pointer list-none flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                Do you offer refunds?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3 px-4 pb-4">
                Yes! We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund within 30 days of purchase.
              </p>
            </details>

            <details className="group">
              <summary className="font-semibold text-slate-800 dark:text-white cursor-pointer list-none flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                Can I share my Premium account?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3 px-4 pb-4">
                Premium is designed for individual use. However, you can manage up to 5 pet profiles, perfect for families with multiple pets!
              </p>
            </details>
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Premium;
