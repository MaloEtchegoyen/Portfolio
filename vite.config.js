import fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const root = import.meta.dirname;
      const dist = resolve(root, 'dist');

      const assetSrc = resolve(root, 'asset');
      const assetDest = resolve(dist, 'asset');
      if (fs.existsSync(assetSrc)) {
        fs.cpSync(assetSrc, assetDest, { recursive: true });
      }

      const filesToCopy = ['robots.txt', 'sitemap.xml', 'favicon.ico'];
      for (const file of filesToCopy) {
        const src = resolve(root, file);
        const dest = resolve(dist, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [copyStaticAssets()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        graphique: resolve(import.meta.dirname, 'graphique.html'),
        projectDetail: resolve(import.meta.dirname, 'projectDetail.html'),
      },
    },
  },
});
