# 🎨 SoulstormAI Homepage - Editorial Version

## ✅ What's Included

### **Tracking & Monetization:**
- ✅ Google Analytics: `G-RF30DV7CY0`
- ✅ Google AdSense: `ca-pub-3424397100313583`
- ✅ 6 Affiliate Partners (Base44, Easyship, Nextiva, Shopify, Vista Social, Wine Express)

### **Features:**
- ✅ Sophisticated dark color palette (no fluorescent/candy colors)
- ✅ Editorial/photographer portfolio style
- ✅ Custom cursor with smooth follow
- ✅ Dark/Light theme toggle
- ✅ Smooth scroll navigation
- ✅ Mobile responsive
- ✅ Interactive app cards with hover effects

### **Color Palette:**
- **PetWander:** Desert tan `#8B7355` (nomadic/roadtrip vibe)
- **TipSplit:** Neon green `#00FF00` (kept original)
- **Oracle:** Eggplant + Gold `#4A148C` + `#B8860B` (Winter 2026 fashion)

---

## 🚀 Quick Start

### **Deploy to Vercel:**
```bash
vercel --prod
```

### **Test Locally:**
Open `version1-editorial.html` in your browser or use Live Server in VS Code.

---

## ➕ HOW TO ADD NEW APPS (Easy!)

### **Step 1: Copy This Template**

Find this section in the HTML (around line 550-650):

```html
<!-- Oracle -->
<section class="app-section oracle" id="oracle">
    <div class="app-grid">
        <div class="app-content">
            <div class="app-number">03</div>
            <div class="app-label">Coming Soon</div>
            <h2 class="app-name">Oracle</h2>
            <p class="app-problem">
                "Mystical guidance without mystical prices."
            </p>
            <p class="app-solution">
                Tarot. I-Ching. Runes. AI-powered interpretations. 
                One subscription. No $50 readings.
            </p>
            <div class="app-features">
                <div class="feature-item">Daily readings</div>
                <div class="feature-item">Multiple divination systems</div>
                <div class="feature-item">Reading history</div>
                <div class="feature-item">Personalized insights</div>
            </div>
            <a href="#" class="btn">Notify Me</a>
        </div>
        <div class="app-visual">
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0.3;">
                Coming Q1 2025
            </div>
        </div>
    </div>
</section>
```

### **Step 2: Duplicate and Modify**

1. **Copy the entire `<section>` block**
2. **Paste it after the last app section**
3. **Update these values:**

```html
<!-- YOUR NEW APP -->
<section class="app-section YOURAPP" id="yourapp">
    <!--       ^^^^^^^ Change this    ^^^^^^^ Change this -->
    <div class="app-grid">
        <div class="app-content">
            <div class="app-number">04</div>
            <!--                   ^^ Next number -->
            <div class="app-label">Live Now</div>
            <!--                   ^^^^^^^^ or "Coming Soon" -->
            <h2 class="app-name">YourApp</h2>
            <!--                 ^^^^^^^ Your app name -->
            <p class="app-problem">
                "What problem does it solve?"
            </p>
            <p class="app-solution">
                Your solution description here.
            </p>
            <div class="app-features">
                <div class="feature-item">Feature 1</div>
                <div class="feature-item">Feature 2</div>
                <div class="feature-item">Feature 3</div>
                <div class="feature-item">Feature 4</div>
            </div>
            <a href="YOUR_URL_HERE" class="btn">Try YourApp</a>
        </div>
        <div class="app-visual">
            <!-- Option A: Embedded iframe -->
            <iframe src="YOUR_APP_URL" loading="lazy"></iframe>
            
            <!-- Option B: Coming soon placeholder -->
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0.3;">
                Coming Soon
            </div>
        </div>
    </div>
</section>
```

### **Step 3: Add Color Styling (in CSS)**

Find the color section in `<style>` (around line 30-50):

```css
:root {
    /* Add your new app color */
    --yourapp: #YOUR_COLOR;
    --yourapp-glow: rgba(R, G, B, 0.3);
}
```

Then add the color class (around line 400):

```css
.yourapp .app-name {
    color: var(--yourapp);
}

.yourapp .app-label {
    color: var(--yourapp);
}

.yourapp .app-visual {
    border-color: var(--yourapp);
}

.yourapp::before {
    background: radial-gradient(circle at 50% 50%, var(--yourapp), transparent 70%);
}
```

### **Step 4: Update Navigation Dots**

Find the nav section (around line 540):

```html
<nav>
    <a href="#hero" class="active"></a>
    <a href="#petwander"></a>
    <a href="#tipsplit"></a>
    <a href="#oracle"></a>
    <a href="#yourapp"></a> <!-- ADD THIS -->
</nav>
```

---

## 🎨 CHANGE COLORS

### **Update App Colors:**

Find `:root` in CSS (around line 20-50):

```css
:root {
    /* Change these values */
    --pet: #8B7355;        /* PetWander */
    --tip: #00FF00;        /* TipSplit */
    --oracle: #4A148C;     /* Oracle */
    
    /* Add new colors */
    --wedding: #C2185B;    /* Wedding app */
    --moon: #1B4332;       /* MoonHabit */
}
```

---

## 🔗 ADD MORE AFFILIATE LINKS

Find the affiliate section in footer (around line 650):

```html
<!-- Add new partner -->
<a href="YOUR_AFFILIATE_URL" target="_blank" rel="noopener" class="affiliate-card">
    <div class="affiliate-category">Category</div>
    <div class="affiliate-name">Partner Name</div>
    <div class="affiliate-desc">Short description</div>
</a>
```

---

## 📊 UPDATE TRACKING CODES

### **Google Analytics:**
Find in `<head>` (line 6-13):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RF30DV7CY0"></script>
```
Change `G-RF30DV7CY0` to your new tracking ID.

### **Google AdSense:**
Find in `<head>` (line 15-17):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3424397100313583"
```
Change `ca-pub-3424397100313583` to your new publisher ID.

---

## 📱 UPDATE SOCIAL LINKS

Find footer section (around line 710):

```html
<a href="https://instagram.com/soulstormai">Instagram</a>
<a href="https://tiktok.com/@soulstormai">TikTok</a>
```

Change `@soulstormai` to your handles.

---

## 🔧 CUSTOMIZATION

### **Change Fonts:**

Find in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Current fonts:
- **Headings:** Cormorant Garamond (elegant serif)
- **Body:** Space Grotesk (modern sans)

To change:
1. Go to [Google Fonts](https://fonts.google.com)
2. Select your fonts
3. Replace the link
4. Update CSS:

```css
body {
    font-family: 'YOUR FONT', sans-serif;
}

.app-name, h1, h2, h3 {
    font-family: 'YOUR HEADING FONT', serif;
}
```

### **Adjust Spacing:**

```css
.app-section {
    padding: 100px 80px; /* Change these */
}
```

### **Change Background:**

```css
:root {
    --bg: #0a0a0a; /* Almost black */
    --fg: #e8e8e8; /* Soft white */
}
```

---

## 📋 FILE STRUCTURE

```
soulstormai-final/
├── version1-editorial.html  (Main homepage)
├── README.md               (This file)
├── privacy.html            (Add this - from previous package)
├── about.html              (Add this - from previous package)
└── ads.txt                 (Add this for AdSense)
```

---

## ✅ CHECKLIST BEFORE DEPLOYING

- [ ] Update all app URLs to live links
- [ ] Verify Analytics tracking ID
- [ ] Verify AdSense publisher ID
- [ ] Add privacy.html, about.html pages
- [ ] Create ads.txt file with your publisher ID
- [ ] Test all affiliate links
- [ ] Test on mobile devices
- [ ] Verify dark/light theme toggle
- [ ] Check custom cursor works on desktop
- [ ] Test smooth scrolling

---

## 🎨 CURRENT COLOR PALETTE

### **Core:**
- Background: `#0a0a0a` (Almost black)
- Text: `#e8e8e8` (Soft white)
- Muted: `#666666` (Medium gray)

### **Apps:**
- **PetWander:** `#8B7355` (Desert tan) + `#2F4F4F` (Slate) + `#CD853F` (Leather)
- **TipSplit:** `#00FF00` (Neon green)
- **Oracle:** `#4A148C` (Eggplant) + `#B8860B` (Dark gold) + `#9B59B6` (Muted purple)

### **Future Apps (Already defined):**
- **Wedding:** `#C2185B` (Deep magenta)
- **MoveMate:** `#FF6B35` (Rust orange)
- **MoonHabit:** `#0D1B2A` (Midnight) + `#1B4332` (Emerald)

---

## 🆘 QUICK FIXES

### **App not showing?**
- Make sure you added the section AND the nav dot
- Check the `id` matches in both places

### **Color not working?**
- Did you define it in `:root`?
- Did you add the CSS class (`.yourapp .app-name` etc)?
- Make sure class name matches section class

### **Affiliate card not styling?**
- Check it has class `affiliate-card`
- Make sure it's inside the grid `<div>`

### **AdSense not showing?**
- Wait 24-48 hours after deployment
- Check ads.txt is in root directory
- Verify site is approved in AdSense dashboard

---

## 📞 SUPPORT

Questions? Email: info@soulstormai.com

---

## 🎊 YOU'RE READY!

Deploy this homepage and watch the reactions! 🚀

**Remember:** This is designed to be EASY to update. Just copy/paste sections and change the values!
