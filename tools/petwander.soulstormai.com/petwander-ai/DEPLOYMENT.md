# 🚀 PetWander AI - Deployment Guide

## Pre-Deployment Checklist

### 1. Update Domain Whitelist

Edit [hooks/useCodeProtection.tsx](hooks/useCodeProtection.tsx) and update allowed domains:

```typescript
const allowedDomains = [
  'soulstormai.com',
  'www.soulstormai.com',
  'petwander-ai.vercel.app',
  'www.petwander-ai.vercel.app',
  // Add your custom domain here
];
```

### 2. Test Protected Build Locally

```bash
# Run protected production build
npm run build:prod

# Preview the build
npm run preview

# Open http://localhost:4173 and test:
# - Domain lock (should block if not localhost)
# - DevTools blocking (F12, right-click disabled)
# - Console protection
# - No API keys in Network tab
```

### 3. Review Build Report

Check `dist/build-report.json` for:
- Total bundle size
- Any warnings about secrets
- File sizes

### 4. Verify No Secrets

```bash
# Search for common secret patterns
grep -r "sk_live_" dist/
grep -r "sk_test_" dist/
grep -r "AIza" dist/

# Should return nothing!
```

## 🌐 Deploying to Vercel

### Step 1: Install Vercel CLI (if not installed)

```bash
npm install -g vercel
```

### Step 2: Set Environment Variables in Vercel

Go to your Vercel dashboard → Project Settings → Environment Variables

**Add these (DO NOT put in code!):**

```
GEMINI_API_KEY = your_gemini_api_key_here
STRIPE_SECRET_KEY = sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET = whsec_xxxxxxxxxxxxx
STRIPE_PRICE_ID_PREMIUM = price_xxxxxxxxxxxxx
NODE_ENV = production
```

### Step 3: Update Vercel Build Settings

In Vercel Dashboard → Project Settings → Build & Development Settings:

**Build Command:**
```bash
npm run build:prod
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### Step 4: Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Or push to your GitHub repository (if connected to Vercel) - it will auto-deploy.

## 🔒 Post-Deployment Verification

### 1. Test Domain Lock

Visit your deployed app:
- ✅ Should work on your Vercel URL
- ✅ Should work on custom domain
- ❌ Should be blocked on any other domain

### 2. Test DevTools Protection

On your live site:
1. Press F12 → Should be blocked
2. Right-click → Should be blocked
3. Ctrl+Shift+I → Should be blocked

### 3. Verify API Security

1. Open Network tab (before protection kicks in)
2. Make API calls
3. Check headers/payload
4. **CONFIRM: No API keys visible**

### 4. Test Functionality

- ✅ User login/signup works
- ✅ Pet profiles save correctly
- ✅ Trip planner generates itineraries
- ✅ Premium upgrade flow works
- ✅ Stripe payments process

## 🎯 Build Commands Reference

```bash
# Development (no protection)
npm run dev

# Standard build (minimal protection)
npm run build

# Protected production build (RECOMMENDED)
npm run build:prod

# Protected build (alias)
npm run build:protected

# Preview production build locally
npm run preview:prod
```

## 🔐 Security Verification

After deployment, verify these security measures are active:

### Client-Side Protections (Active):
- ✅ Code obfuscation
- ✅ No source maps
- ✅ Console logs removed
- ✅ Domain locking
- ✅ DevTools blocking
- ✅ Anti-screenshot watermark

### Server-Side Protections (Setup):
- ✅ API keys on server only
- ✅ Environment variables in Vercel
- ✅ Backend API proxy for Gemini
- ✅ Rate limiting (if implemented)

## 🛠️ Troubleshooting

### Issue: Domain Lock Blocking Your Own Domain

**Solution:**
1. Edit [hooks/useCodeProtection.tsx](hooks/useCodeProtection.tsx)
2. Add your domain to `allowedDomains` array
3. Rebuild: `npm run build:prod`
4. Redeploy

### Issue: "Unauthorized Domain" on Vercel

**Solution:**
1. Check your Vercel deployment URL
2. Add it to `allowedDomains` in [hooks/useCodeProtection.tsx](hooks/useCodeProtection.tsx)
3. Include both with and without `www.` subdomain

### Issue: API Calls Failing

**Solution:**
1. Verify environment variables in Vercel dashboard
2. Check API endpoints are correct (`/api/gemini`, etc.)
3. Ensure serverless functions are deployed
4. Check Vercel function logs

### Issue: Obfuscation Too Aggressive (App Breaks)

**Solution:**
1. Edit [vite.config.ts](vite.config.ts)
2. Reduce obfuscation thresholds:
   - `controlFlowFlatteningThreshold: 0.5` → `0.3`
   - `deadCodeInjectionThreshold: 0.4` → `0.2`
3. Or disable specific features:
   - `deadCodeInjection: false`
   - `debugProtection: false`

### Issue: Build Too Large

**Solution:**
1. Code splitting is already configured
2. Consider lazy loading more components
3. Check for duplicate dependencies
4. Use Vercel's compression (automatic)

## 📊 Monitoring & Analytics

### Vercel Analytics

Enable in Vercel dashboard for:
- Page views
- Performance metrics
- Error tracking

### Custom Event Tracking

Use the `UsageTracker` utility:

```typescript
import { UsageTracker } from './utils/securityUtils';

const tracker = new UsageTracker();
tracker.track('trip_created', { destination: 'Hawaii' });
```

## 🔄 Updating Your Deployment

### Quick Updates (No Code Changes)

```bash
# Just push to GitHub (if auto-deploy is enabled)
git push origin main
```

### Major Updates (With Protection)

```bash
# 1. Test locally
npm run build:prod
npm run preview

# 2. Commit changes
git add .
git commit -m "Update: description"
git push origin main

# 3. Or deploy directly
vercel --prod
```

## 🎯 Performance Optimization

Your build is already optimized with:
- ✅ Code splitting (vendor, ui chunks)
- ✅ Minification (Terser)
- ✅ Gzip compression
- ✅ Tree shaking
- ✅ Chunk hashing for caching

### Additional Optimizations:

1. **Enable Vercel Edge Network**
   - Automatic via Vercel

2. **Add Service Worker** (Optional)
   - For offline support
   - PWA capabilities

3. **Image Optimization**
   - Use Vercel Image Optimization
   - Or next-gen formats (WebP, AVIF)

## 📝 Maintenance Schedule

### Weekly:
- Check Vercel deployment logs
- Monitor error rates
- Review usage analytics

### Monthly:
- Update dependencies: `npm update`
- Rebuild with latest security: `npm run build:prod`
- Review and rotate API keys if needed

### Quarterly:
- Update obfuscation settings
- Review and update security measures
- Performance audit

## ✅ Deployment Complete!

Your PetWander AI application is now:

1. ✅ Fully protected with code obfuscation
2. ✅ Secured with domain locking
3. ✅ API keys hidden on server-side
4. ✅ DevTools protection active
5. ✅ Optimized for production
6. ✅ Ready for users!

## 🆘 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review [SECURITY.md](SECURITY.md) documentation
3. Test locally with `npm run build:prod && npm run preview`
4. Check environment variables in Vercel dashboard

---

**Happy Deploying! 🚀**
