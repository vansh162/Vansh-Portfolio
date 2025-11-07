// Build script for Vercel deployment
// Copies all files to public directory

const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const outputDir = path.join(__dirname, 'public');

// Clean and create public directory
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Function to copy files recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    // Skip node_modules, .git, and public directories
    if (src.includes('node_modules') || src.includes('.git') || src.includes('public')) {
      return;
    }
    
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

// Copy all files except build files and Next.js files
const itemsToCopy = fs.readdirSync(sourceDir).filter(item => {
  const excludeItems = [
    'node_modules', 
    '.git', 
    'build.js', 
    'public', 
    'package.json', 
    'package-lock.json', 
    '.vercel',
    'app',  // Next.js App Router files (not needed for static site)
    'pages' // Next.js Pages Router files (not needed for static site)
  ];
  return !excludeItems.includes(item) && !item.startsWith('.');
});

itemsToCopy.forEach(item => {
  const srcPath = path.join(sourceDir, item);
  const destPath = path.join(outputDir, item);
  copyRecursiveSync(srcPath, destPath);
});

console.log('Build completed! Files copied to public directory.');

