// Usage tracking service for free vs premium tier limits

export interface UsageStats {
  countryLookups: number;
  tripPlans: number;
  petScans: number;
  savedTrips: number;
  lastReset: string; // ISO date string
}

const USAGE_KEY = 'petwander_usage';
const RESET_INTERVAL_DAYS = 30;

// Free tier limits
export const FREE_LIMITS = {
  countryLookups: 3,
  tripPlans: 3,
  petScans: 1,
  savedTrips: 3,
};

// Get current usage stats
export const getUsageStats = (): UsageStats => {
  const stored = localStorage.getItem(USAGE_KEY);

  if (!stored) {
    return initializeUsage();
  }

  const stats: UsageStats = JSON.parse(stored);

  // Check if we need to reset (monthly reset)
  const lastReset = new Date(stats.lastReset);
  const now = new Date();
  const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSinceReset >= RESET_INTERVAL_DAYS) {
    return resetUsage();
  }

  return stats;
};

// Initialize new usage tracking
const initializeUsage = (): UsageStats => {
  const stats: UsageStats = {
    countryLookups: 0,
    tripPlans: 0,
    petScans: 0,
    savedTrips: 0,
    lastReset: new Date().toISOString(),
  };
  localStorage.setItem(USAGE_KEY, JSON.stringify(stats));
  return stats;
};

// Reset usage (monthly)
const resetUsage = (): UsageStats => {
  const stats: UsageStats = {
    countryLookups: 0,
    tripPlans: 0,
    petScans: 0,
    savedTrips: 0,
    lastReset: new Date().toISOString(),
  };
  localStorage.setItem(USAGE_KEY, JSON.stringify(stats));
  return stats;
};

// Increment usage counter
export const incrementUsage = (type: keyof Omit<UsageStats, 'lastReset'>): void => {
  const stats = getUsageStats();
  stats[type] = stats[type] + 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify(stats));
};

// Decrement usage counter (e.g., when deleting a saved trip)
export const decrementUsage = (type: keyof Omit<UsageStats, 'lastReset'>): void => {
  const stats = getUsageStats();
  if (stats[type] > 0) {
    stats[type] = stats[type] - 1;
    localStorage.setItem(USAGE_KEY, JSON.stringify(stats));
  }
};

// Check if user has remaining quota for an action
export const canUseFeature = (
  type: keyof Omit<UsageStats, 'lastReset'>,
  isPremium: boolean
): { allowed: boolean; remaining: number; limit: number } => {
  if (isPremium) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const stats = getUsageStats();
  const limit = FREE_LIMITS[type];
  const used = stats[type];
  const remaining = Math.max(0, limit - used);

  return {
    allowed: used < limit,
    remaining,
    limit,
  };
};

// Get days until reset
export const getDaysUntilReset = (): number => {
  const stats = getUsageStats();
  const lastReset = new Date(stats.lastReset);
  const now = new Date();
  const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, RESET_INTERVAL_DAYS - daysSinceReset);
};
