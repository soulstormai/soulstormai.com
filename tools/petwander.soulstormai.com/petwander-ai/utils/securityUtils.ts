// 🔐 Security Utilities for PetWander AI
// API Protection, Rate Limiting, and String Encryption

// ============================================
// SECURE API CLASS
// ============================================
export class SecureAPI {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_URL || '/api';
    this.token = this.getToken();
  }

  /**
   * Get authentication token from localStorage
   */
  private getToken(): string | null {
    try {
      return localStorage.getItem('auth_token');
    } catch {
      return null;
    }
  }

  /**
   * Set authentication token
   */
  public setToken(token: string): void {
    this.token = token;
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  /**
   * Clear authentication token
   */
  public clearToken(): void {
    this.token = null;
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Failed to clear token:', error);
    }
  }

  /**
   * Make secure API call through backend proxy
   * All API calls go through YOUR backend, never directly to third-party APIs
   */
  public async call<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: 'API call failed',
        }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  /**
   * Call Gemini AI through backend proxy
   * NEVER expose Gemini API key in frontend!
   */
  public async callGemini(prompt: string): Promise<any> {
    return this.call('/gemini', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  /**
   * Search hotels through backend proxy
   */
  public async searchHotels(query: any): Promise<any> {
    return this.call('/hotels/search', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  }

  /**
   * Create Stripe checkout session through backend
   */
  public async createCheckoutSession(priceId: string): Promise<any> {
    return this.call('/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    });
  }
}

// ============================================
// STRING ENCRYPTION/OBFUSCATION
// ============================================
export class SecureString {
  private static readonly SECRET_KEY = 'petwander-ai-2024-secure';

  /**
   * Encode/encrypt a string using XOR cipher + Base64
   */
  public static encode(str: string): string {
    let encoded = '';

    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const keyCode = this.SECRET_KEY.charCodeAt(i % this.SECRET_KEY.length);
      encoded += String.fromCharCode(charCode ^ keyCode);
    }

    return btoa(encoded);
  }

  /**
   * Decode/decrypt a string
   */
  public static decode(encoded: string): string {
    const decoded = atob(encoded);
    let result = '';

    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyCode = this.SECRET_KEY.charCodeAt(i % this.SECRET_KEY.length);
      result += String.fromCharCode(charCode ^ keyCode);
    }

    return result;
  }

  /**
   * Hash a string (one-way, for verification)
   */
  public static async hash(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

// ============================================
// RATE LIMITER
// ============================================
export class RateLimiter {
  private calls: number[] = [];
  private maxCalls: number;
  private windowMs: number;

  /**
   * Create a rate limiter
   * @param maxCalls Maximum number of calls allowed
   * @param windowMs Time window in milliseconds
   */
  constructor(maxCalls: number = 10, windowMs: number = 60000) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
  }

  /**
   * Check if a call can be made
   * @returns true if call is allowed, false if rate limited
   */
  public canMakeCall(): boolean {
    const now = Date.now();

    // Remove old calls outside the time window
    this.calls = this.calls.filter(time => now - time < this.windowMs);

    // Check if under limit
    if (this.calls.length >= this.maxCalls) {
      return false;
    }

    // Record this call
    this.calls.push(now);
    return true;
  }

  /**
   * Get remaining calls in current window
   */
  public getRemainingCalls(): number {
    const now = Date.now();
    this.calls = this.calls.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxCalls - this.calls.length);
  }

  /**
   * Get time until next call is allowed (in milliseconds)
   */
  public getTimeUntilReset(): number {
    if (this.calls.length === 0) return 0;

    const now = Date.now();
    const oldestCall = Math.min(...this.calls);
    const timeUntilReset = this.windowMs - (now - oldestCall);

    return Math.max(0, timeUntilReset);
  }

  /**
   * Reset the rate limiter
   */
  public reset(): void {
    this.calls = [];
  }
}

// ============================================
// USAGE TRACKER
// ============================================
export class UsageTracker {
  private storageKey: string;

  constructor(storageKey: string = 'app_usage') {
    this.storageKey = storageKey;
  }

  /**
   * Track a usage event
   */
  public track(eventType: string, metadata?: any): void {
    const usage = this.getUsage();

    const event = {
      type: eventType,
      timestamp: Date.now(),
      metadata,
    };

    usage.events.push(event);
    usage.totalEvents++;

    if (!usage.eventCounts[eventType]) {
      usage.eventCounts[eventType] = 0;
    }
    usage.eventCounts[eventType]++;

    this.saveUsage(usage);
  }

  /**
   * Get usage statistics
   */
  public getUsage(): {
    events: any[];
    totalEvents: number;
    eventCounts: Record<string, number>;
  } {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to get usage:', error);
    }

    return {
      events: [],
      totalEvents: 0,
      eventCounts: {},
    };
  }

  /**
   * Save usage data
   */
  private saveUsage(usage: any): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(usage));
    } catch (error) {
      console.error('Failed to save usage:', error);
    }
  }

  /**
   * Clear usage data
   */
  public clearUsage(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to clear usage:', error);
    }
  }

  /**
   * Get event count for a specific type
   */
  public getEventCount(eventType: string): number {
    const usage = this.getUsage();
    return usage.eventCounts[eventType] || 0;
  }
}

// ============================================
// EXPORTS
// ============================================
export default {
  SecureAPI,
  SecureString,
  RateLimiter,
  UsageTracker,
};
