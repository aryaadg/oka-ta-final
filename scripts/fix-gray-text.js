const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Pages and components to fix (exclude footer which should stay gray)
const targets = [
  'src/app/[locale]/page.tsx',
  'src/app/[locale]/about/page.tsx',
  'src/app/[locale]/artists/page.tsx',
  'src/app/[locale]/services/page.tsx',
  'src/app/[locale]/gallery/page.tsx',
  'src/app/[locale]/contact/page.tsx',
  'src/app/[locale]/contact/ContactForm.tsx',
  'src/components/site/Header.tsx',
];

let totalChanges = 0;

targets.forEach(relPath => {
  const fullPath = relPath;
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${relPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  // Replace text-muted-foreground on h1/h2/h3 section headers with text-foreground
  // Specifically target the pattern inside className strings for heading elements
  content = content.replace(/(<h[1-6][^>]*className="[^"]*?)text-muted-foreground([^"]*")/g, '$1text-foreground$2');
  content = content.replace(/(<h[1-6][^>]*className=\{`[^`]*?)text-muted-foreground([^`]*`\})/g, '$1text-foreground$2');

  // Replace standalone text-muted-foreground/80 on <p> tags (subtitles) 
  content = content.replace(/text-muted-foreground\/80/g, 'text-gray-300');
  content = content.replace(/text-muted-foreground\/70/g, 'text-gray-400');

  if (content !== original) {
    fs.writeFileSync(fullPath, content);
    const lines = (original.match(/text-muted-foreground/g) || []).length - (content.match(/text-muted-foreground/g) || []).length;
    console.log(`FIXED ${relPath}: ~${lines} replacements`);
    totalChanges++;
  } else {
    console.log(`OK   ${relPath}: no changes needed`);
  }
});

console.log(`\nDone. ${totalChanges} files updated.`);
