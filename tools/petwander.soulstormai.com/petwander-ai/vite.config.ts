import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'rollup-plugin-obfuscator';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),

      // Compress output files (gzip)
      viteCompression({
        verbose: true,
        disable: !isProduction,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),

      // Code obfuscation (ONLY in production)
      isProduction && obfuscator({
        global: false,
        options: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: false, // Set true for extra protection (may break some apps)
          debugProtectionInterval: 0,
          disableConsoleOutput: true,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          numbersToExpressions: true,
          renameGlobals: false,
          selfDefending: true,
          simplify: true,
          splitStrings: true,
          splitStringsChunkLength: 10,
          stringArray: true,
          stringArrayEncoding: ['base64'],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 2,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 4,
          stringArrayWrappersType: 'function',
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
          unicodeEscapeSequence: false
        }
      }),
    ].filter(Boolean),

    define: {
      // Only expose API key in development
      // In production, use backend proxy!
      'process.env.API_KEY': isProduction
        ? JSON.stringify('')
        : JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': isProduction
        ? JSON.stringify('')
        : JSON.stringify(env.GEMINI_API_KEY)
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },

    build: {
      // CRITICAL: Disable source maps in production
      sourcemap: false,

      // Advanced minification with Terser
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,      // Remove all console.log
          drop_debugger: true,     // Remove debugger statements
          pure_funcs: [
            'console.log',
            'console.info',
            'console.debug',
            'console.warn'
          ],
          passes: 2,                // Multiple passes for better compression
        },
        mangle: {
          toplevel: true,           // Mangle top-level names
          eval: true,               // Mangle names in eval
          keep_classnames: false,   // Don't preserve class names
          keep_fnames: false,       // Don't preserve function names
        },
        format: {
          comments: false,          // Remove all comments
          ascii_only: true,         // Escape non-ASCII characters
        }
      },

      // Chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui': ['lucide-react'],
          },
          // Randomize chunk names in production
          chunkFileNames: isProduction
            ? 'assets/[name]-[hash].js'
            : 'assets/[name].js',
          entryFileNames: isProduction
            ? 'assets/[name]-[hash].js'
            : 'assets/[name].js',
          assetFileNames: isProduction
            ? 'assets/[name]-[hash].[ext]'
            : 'assets/[name].[ext]',
        }
      },

      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
  };
});
