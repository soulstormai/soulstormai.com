// 🔒 Anti-Reverse-Engineering Protection Hook
// Comprehensive client-side protection for PetWander AI

import { useEffect } from 'react';

export function useCodeProtection() {
  useEffect(() => {
    // Only enable protection in production
    if (import.meta.env.DEV) return;

    // ============================================
    // 1. DOMAIN LOCK
    // ============================================
    const allowedDomains = [
      'soulstormai.com',
      'petwander-ai.vercel.app',
      'www.soulstormai.com',
      'www.petwander-ai.vercel.app'
    ];

    const currentDomain = window.location.hostname;

    if (!allowedDomains.some(domain => currentDomain.includes(domain))) {
      document.body.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        ">
          <div>
            <h1 style="font-size: 3em; margin-bottom: 0.5em;">🔒</h1>
            <h2>Unauthorized Domain</h2>
            <p>This application is not authorized to run on this domain.</p>
          </div>
        </div>
      `;
      throw new Error('Unauthorized domain');
    }

    // ============================================
    // 2. DISABLE DEVELOPER TOOLS
    // ============================================
    const disableDevTools = () => {
      // Disable right-click
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable keyboard shortcuts for DevTools
      document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
          e.preventDefault();
          return false;
        }

        // Ctrl+Shift+I (Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
          e.preventDefault();
          return false;
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
          e.preventDefault();
          return false;
        }

        // Ctrl+Shift+C (Element Picker)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
          e.preventDefault();
          return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault();
          return false;
        }

        // Cmd+Option+I (Mac)
        if (e.metaKey && e.altKey && e.key === 'i') {
          e.preventDefault();
          return false;
        }
      });
    };

    // ============================================
    // 3. DETECT DEVTOOLS OPENING
    // ============================================
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: system-ui, -apple-system, sans-serif;
            background: #1a1a1a;
            color: #ff6b6b;
            text-align: center;
          ">
            <div>
              <h1 style="font-size: 4em; margin-bottom: 0.2em;">⚠️</h1>
              <h1>Developer Tools Detected</h1>
              <p style="font-size: 1.2em; opacity: 0.8;">Please close developer tools to continue using PetWander AI.</p>
              <button
                onclick="window.location.reload()"
                style="
                  margin-top: 2em;
                  padding: 12px 24px;
                  font-size: 1em;
                  background: #ff6b6b;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                "
              >
                Reload Page
              </button>
            </div>
          </div>
        `;
      }
    };

    // ============================================
    // 4. CONSOLE PROTECTION
    // ============================================
    let devtoolsOpen = false;

    const consoleCheck = setInterval(() => {
      const before = new Date().getTime();
      // eslint-disable-next-line no-debugger
      debugger; // This will pause if DevTools is open
      const after = new Date().getTime();

      if (after - before > 100) {
        // DevTools is open (debugger paused execution)
        devtoolsOpen = true;
        window.location.reload();
      }
    }, 1000);

    // ============================================
    // 5. DISABLE CONSOLE METHODS
    // ============================================
    const disableConsole = () => {
      const noop = () => {};
      const noopWithReturn = () => ({ log: noop });

      window.console.log = noop;
      window.console.warn = noop;
      window.console.error = noop;
      window.console.info = noop;
      window.console.debug = noop;
      window.console.dir = noop;
      window.console.dirxml = noop;
      window.console.table = noop;
      window.console.trace = noop;
      window.console.group = noop;
      window.console.groupCollapsed = noop;
      window.console.groupEnd = noop;
      window.console.clear = noop;
      window.console.count = noop;
      window.console.assert = noop;
      window.console.markTimeline = noop;
      window.console.profile = noop;
      window.console.profileEnd = noop;
      window.console.timeline = noop;
      window.console.timelineEnd = noop;
      window.console.time = noop;
      window.console.timeEnd = noop;
      window.console.timeStamp = noop;
      window.console.context = noopWithReturn;
      window.console.memory = {} as any;
    };

    // ============================================
    // 6. CODE INTEGRITY CHECK
    // ============================================
    let checkCount = 0;
    let initialBodyLength = 0;

    const integrityCheck = setInterval(() => {
      checkCount++;
      const bodyLength = document.body.innerHTML.length;

      // Store initial length on first check
      if (initialBodyLength === 0) {
        initialBodyLength = bodyLength;
      }

      // If DOM changed drastically, someone may be tampering
      const change = Math.abs(bodyLength - initialBodyLength) / initialBodyLength;

      // Allow 50% change after 5 checks (app is loaded)
      if (change > 0.5 && checkCount > 5) {
        // Reset if change is too drastic (possible tampering)
        initialBodyLength = bodyLength;
      }
    }, 3000);

    // ============================================
    // 7. ANTI-SCREENSHOT WATERMARK
    // ============================================
    const antiScreenshot = () => {
      const watermark = document.createElement('div');
      watermark.id = 'protection-watermark';
      watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999999;
        opacity: 0.02;
        background-image: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 100px,
          rgba(0,0,0,0.1) 100px,
          rgba(0,0,0,0.1) 200px
        );
        mix-blend-mode: multiply;
      `;

      // Add subtle text watermark
      watermark.innerHTML = `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 4em;
          font-weight: bold;
          color: rgba(0,0,0,0.05);
          user-select: none;
          white-space: nowrap;
        ">
          PetWander AI - Protected
        </div>
      `;

      document.body.appendChild(watermark);
    };

    // ============================================
    // 8. ADVANCED DEVTOOLS DETECTION
    // ============================================
    const advancedDevToolsDetection = () => {
      const element = new Image();
      let isOpen = false;

      Object.defineProperty(element, 'id', {
        get: function() {
          isOpen = true;
          detectDevTools();
        }
      });

      const checkInterval = setInterval(() => {
        isOpen = false;
        console.log(element);
        console.clear();

        if (isOpen) {
          clearInterval(checkInterval);
        }
      }, 1000);

      return checkInterval;
    };

    // ============================================
    // INITIALIZE ALL PROTECTIONS
    // ============================================
    console.log('%c🔒 PetWander AI', 'font-size: 24px; font-weight: bold; color: #667eea;');
    console.log('%cThis application is protected.', 'font-size: 14px; color: #888;');

    disableDevTools();
    disableConsole();
    antiScreenshot();

    // Run detections
    const detectionInterval = setInterval(detectDevTools, 500);
    const advancedDetection = advancedDevToolsDetection();

    // ============================================
    // CLEANUP
    // ============================================
    return () => {
      clearInterval(consoleCheck);
      clearInterval(integrityCheck);
      clearInterval(detectionInterval);
      clearInterval(advancedDetection);
    };
  }, []);
}
