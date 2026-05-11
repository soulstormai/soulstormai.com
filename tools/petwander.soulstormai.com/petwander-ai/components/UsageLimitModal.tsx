import React from 'react';
import { Crown, X, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  limit: number;
  remaining: number;
  daysUntilReset: number;
}

const UsageLimitModal: React.FC<UsageLimitModalProps> = ({
  isOpen,
  onClose,
  featureName,
  limit,
  remaining,
  daysUntilReset,
}) => {
  if (!isOpen) return null;

  const isAtLimit = remaining === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {isAtLimit ? 'Limit Reached' : 'Usage Warning'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {isAtLimit ? (
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Free {featureName} Limit Reached
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You've used all <span className="font-bold text-primary-600 dark:text-primary-400">{limit} free {featureName}</span> this month.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Resets in <span className="font-bold">{daysUntilReset} days</span>
              </p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Almost at your limit
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You have <span className="font-bold text-primary-600 dark:text-primary-400">{remaining} of {limit}</span> free {featureName} remaining this month.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Resets in <span className="font-bold">{daysUntilReset} days</span>
              </p>
            </div>
          )}

          {/* Premium Benefits */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h4 className="font-bold text-primary-800 dark:text-primary-300">Premium Benefits</h4>
            </div>
            <ul className="space-y-2 text-sm text-primary-900 dark:text-primary-200">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Unlimited {featureName}</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Faster AI responses with priority queue</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Advanced features & offline mode</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            {isAtLimit ? (
              <>
                <Link
                  to="/premium"
                  className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3 rounded-xl transition-all text-center shadow-lg shadow-primary-500/30"
                >
                  Upgrade to Premium
                </Link>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary-500/30"
                >
                  Continue with Free Plan
                </button>
                <Link
                  to="/premium"
                  className="block w-full py-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors text-center"
                >
                  Learn More About Premium
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageLimitModal;
