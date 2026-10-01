#!/usr/bin/env node
/**
 * Build script for gorstak-site
 * Copies the static site to the releases folder
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname);
const RELEASES_DIR = path.join(__dirname, '..', '..', 'releases');
const TARGET_DIR = path.join(RELEASES_DIR, 'gorstak-site');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  console.log('Building gorstak-site...');
  
  // Ensure releases directory exists
  if (!fs.existsSync(RELEASES_DIR)) {
    fs.mkdirSync(RELEASES_DIR, { recursive: true });
  }
  
  // Clean target directory
  if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
  }
  
  // Copy site files (excluding .git, node_modules, etc.)
  const excludeDirs = ['.git', 'node_modules', '.github'];
  const excludeFiles = ['.gitignore', 'README.md'];
  
  const items = fs.readdirSync(SOURCE_DIR);
  
  items.forEach(item => {
    const itemPath = path.join(SOURCE_DIR, item);
    const stat = fs.statSync(itemPath);
    
    // Skip excluded directories and files
    if (excludeDirs.includes(item) || excludeFiles.includes(item)) {
      console.log(`Skipping: ${item}`);
      return;
    }
    
    if (stat.isDirectory()) {
      copyRecursiveSync(itemPath, path.join(TARGET_DIR, item));
    } else {
      // Only copy certain file types
      const ext = path.extname(item).toLowerCase();
      const allowedExts = ['.html', '.css', '.js', '.json', '.ico', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'];
      
      if (allowedExts.includes(ext) || item === 'CNAME' || item === 'robots.txt' || item === 'sitemap.xml') {
        fs.copyFileSync(itemPath, path.join(TARGET_DIR, item));
        console.log(`Copied: ${item}`);
      } else {
        console.log(`Skipping file: ${item}`);
      }
    }
  });
  
  console.log(`Build complete! Site copied to: ${TARGET_DIR}`);
}

if (require.main === module) {
  main();
}

module.exports = { main };
