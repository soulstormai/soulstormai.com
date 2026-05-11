#!/usr/bin/env node
// 🔒 Post-Build Protection Script
// Additional security layer after Vite build

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JavaScriptObfuscator from 'javascript-obfuscator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

console.log('🔒 Starting post-build protection...\n');

// ============================================
// 1. REMOVE SOURCE MAPS
// ============================================
function removeSourceMaps() {
  console.log('📝 Removing source maps...');

  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('⚠️  Assets directory not found. Skipping source map removal.');
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  let removed = 0;

  files.forEach(file => {
    if (file.endsWith('.map')) {
      const filePath = path.join(ASSETS_DIR, file);
      fs.unlinkSync(filePath);
      removed++;
      console.log(`   ✓ Removed: ${file}`);
    }
  });

  console.log(`   ✓ Removed ${removed} source map file(s)\n`);
}

// ============================================
// 2. ADDITIONAL OBFUSCATION LAYER
// ============================================
function additionalObfuscation() {
  console.log('🔐 Applying additional obfuscation...');

  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('⚠️  Assets directory not found. Skipping obfuscation.');
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  let obfuscated = 0;

  files.forEach(file => {
    if (file.endsWith('.js') && !file.includes('.min.')) {
      const filePath = path.join(ASSETS_DIR, file);
      const code = fs.readFileSync(filePath, 'utf8');

      try {
        // Apply extra obfuscation layer
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          deadCodeInjection: false,
          debugProtection: false,
          disableConsoleOutput: true,
          identifierNamesGenerator: 'mangled',
          renameGlobals: false,
          selfDefending: true,
          stringArray: true,
          stringArrayEncoding: ['base64'],
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
        }).getObfuscatedCode();

        fs.writeFileSync(filePath, obfuscatedCode);
        obfuscated++;
        console.log(`   ✓ Obfuscated: ${file}`);
      } catch (error) {
        console.error(`   ✗ Failed to obfuscate ${file}:`, error.message);
      }
    }
  });

  console.log(`   ✓ Obfuscated ${obfuscated} JavaScript file(s)\n`);
}

// ============================================
// 3. VERIFY NO SECRETS IN BUILD
// ============================================
function verifySecurity() {
  console.log('🔍 Verifying security...');

  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('⚠️  Assets directory not found. Skipping security verification.');
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const dangerousPatterns = [
    /sk_live_[a-zA-Z0-9]{24,}/g,           // Stripe live keys
    /sk_test_[a-zA-Z0-9]{24,}/g,           // Stripe test keys
    /AIza[0-9A-Za-z-_]{35}/g,              // Google API keys
    /AKIA[0-9A-Z]{16}/g,                   // AWS Access Key
    /github_pat_[a-zA-Z0-9]{22,}/g,        // GitHub PAT
    /ghp_[a-zA-Z0-9]{36}/g,                // GitHub Personal Token
  ];

  let warnings = 0;

  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(ASSETS_DIR, file);
      const code = fs.readFileSync(filePath, 'utf8');

      dangerousPatterns.forEach((pattern, index) => {
        if (pattern.test(code)) {
          console.error(`   ⚠️  POTENTIAL SECRET DETECTED in ${file}`);
          warnings++;
        }
      });
    }
  });

  if (warnings === 0) {
    console.log('   ✓ No obvious secrets detected\n');
  } else {
    console.error(`\n   ⚠️  ${warnings} potential secret(s) found! Review your build.\n`);
  }
}

// ============================================
// 4. ADD INTEGRITY TAGS
// ============================================
function addIntegrityTags() {
  console.log('🔐 Adding integrity attributes...');

  const indexPath = path.join(DIST_DIR, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  index.html not found. Skipping integrity tags.');
    return;
  }

  let html = fs.readFileSync(indexPath, 'utf8');

  // Add security headers via meta tags
  const securityHeaders = `
  <!-- Security Headers -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
  <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
  `;

  // Insert before </head>
  html = html.replace('</head>', `  ${securityHeaders}\n  </head>`);

  fs.writeFileSync(indexPath, html);
  console.log('   ✓ Added security headers to index.html\n');
}

// ============================================
// 5. GENERATE BUILD REPORT
// ============================================
function generateReport() {
  console.log('📊 Generating build report...');

  if (!fs.existsSync(DIST_DIR)) {
    console.log('⚠️  Dist directory not found.');
    return;
  }

  const report = {
    buildTime: new Date().toISOString(),
    files: [],
    totalSize: 0,
  };

  function scanDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        scanDir(filePath);
      } else {
        const relativePath = path.relative(DIST_DIR, filePath);
        report.files.push({
          path: relativePath,
          size: stats.size,
          sizeKB: (stats.size / 1024).toFixed(2) + ' KB',
        });
        report.totalSize += stats.size;
      }
    });
  }

  scanDir(DIST_DIR);

  report.totalSizeMB = (report.totalSize / (1024 * 1024)).toFixed(2) + ' MB';
  report.fileCount = report.files.length;

  const reportPath = path.join(DIST_DIR, 'build-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`   ✓ Build report saved to: ${reportPath}`);
  console.log(`   ✓ Total files: ${report.fileCount}`);
  console.log(`   ✓ Total size: ${report.totalSizeMB}\n`);
}

// ============================================
// RUN ALL PROTECTIONS
// ============================================
async function protect() {
  try {
    removeSourceMaps();
    additionalObfuscation();
    verifySecurity();
    addIntegrityTags();
    generateReport();

    console.log('✅ Post-build protection complete!\n');
    console.log('🚀 Your build is now protected and ready for deployment.\n');
  } catch (error) {
    console.error('❌ Error during post-build protection:', error);
    process.exit(1);
  }
}

protect();
