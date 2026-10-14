import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

import { execSync } from 'child_process';

// Helper to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function regenerateTestimonials() {
  try {
    const scriptPath = path.resolve(import.meta.dirname, 'scripts/convert-testimonials.js');
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error('[Testimonials Plugin] Error converting testimonials:', err.message);
  }
}

export default defineConfig({
  base: '/Vishal-Portfolio/',
  publicDir: 'public',
  server: {
    port: 3000,
    open: false,
    fs: {
      allow: ['..']
    }
  },
  build: {
    chunkSizeWarningLimit: 1200
  },
  plugins: [
    {
      name: 'testimonials-excel-watcher',
      buildStart() {
        console.log('[Testimonials Plugin] Ensuring testimonials are up to date on build...');
        regenerateTestimonials();
      },
      configureServer(server) {
        const excelPath = path.resolve(import.meta.dirname, 'content/testimonials/testimonials.xlsx');
        server.watcher.add(excelPath);
        server.watcher.on('all', (event, changedPath) => {
          if (changedPath && path.resolve(changedPath) === excelPath) {
            console.log(`[Testimonials Plugin] Detected ${event} on testimonials.xlsx. Regenerating...`);
            regenerateTestimonials();
            const jsonPath = path.resolve(import.meta.dirname, 'src/data/testimonials.json');
            const mod = server.moduleGraph.getModuleById(jsonPath);
            if (mod) server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        });
      }
    },
    {
      name: 'serve-and-copy-assets',
      configureServer(server) {
        // Serve /assets from ./assets, handling both root and base-prefixed paths
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const cleanUrl = req.url.replace(/^\/Vishal-Portfolio/, '');

          if (cleanUrl.startsWith('/assets/')) {
            const relativePath = decodeURIComponent(cleanUrl.replace(/^\//, ''));
            let filePath = path.resolve(import.meta.dirname, relativePath);
            if (!fs.existsSync(filePath)) {
              if (relativePath.startsWith('assets/review/')) {
                const alt = path.resolve(import.meta.dirname, relativePath.replace('assets/review/', 'assets/images/review/'));
                if (fs.existsSync(alt)) filePath = alt;
              } else if (relativePath.includes('seminar 7.jpg')) {
                const alt = path.resolve(import.meta.dirname, relativePath.replace('seminar 7.jpg', 'seminar  7.jpg'));
                if (fs.existsSync(alt)) filePath = alt;
              }
            }
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeTypes = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.mp4': 'video/mp4',
                '.pdf': 'application/pdf',
                '.json': 'application/json'
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              return fs.createReadStream(filePath).pipe(res);
            }
          }
          if (cleanUrl === '/Vishal%20Resume.pdf' || cleanUrl === '/Vishal Resume.pdf') {
            const filePath = path.resolve(import.meta.dirname, 'Vishal Resume.pdf');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'application/pdf');
              return fs.createReadStream(filePath).pipe(res);
            }
          }
          next();
        });
      },
      closeBundle() {
        // Copy assets to dist/assets on build
        const outAssets = path.resolve(import.meta.dirname, 'dist/assets');
        const srcAssets = path.resolve(import.meta.dirname, 'assets');
        copyDir(srcAssets, outAssets);

        // Copy resume to dist
        const resumeSrc = path.resolve(import.meta.dirname, 'Vishal Resume.pdf');
        const resumeDest = path.resolve(import.meta.dirname, 'dist/Vishal Resume.pdf');
        if (fs.existsSync(resumeSrc)) {
          fs.copyFileSync(resumeSrc, resumeDest);
        }
        console.log('[Build] Copied assets and resume to dist/');
      }
    }
  ]
});
