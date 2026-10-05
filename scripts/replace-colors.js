const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bbg-paper\b/g, replacement: 'bg-background' },
  { regex: /\btext-ink\b/g, replacement: 'text-foreground' },
  { regex: /\bbg-ink\b/g, replacement: 'bg-card' },
  { regex: /\btext-paper\b/g, replacement: 'text-muted-foreground' },
  { regex: /\bbg-white\b/g, replacement: 'bg-gym-darkCard' },
  { regex: /\bborder-graphite\/(20|30|40)\b/g, replacement: 'border-gym-darkBorder' },
  { regex: /\bborder-stencil\b/g, replacement: 'border-gym-gold' },
  { regex: /\btext-stencil\b/g, replacement: 'text-gym-gold' },
  { regex: /\bring-stencil\b/g, replacement: 'ring-gym-gold' },
  { regex: /\bselection:bg-stencil\b/g, replacement: 'selection:bg-gym-gold' },
  { regex: /\bfont-display\b/g, replacement: 'font-sans' },
  { regex: /\bdark:text-paper\b/g, replacement: '' },
  { regex: /\bdark:bg-ink\b/g, replacement: '' },
  { regex: /\bdark:bg-paper\b/g, replacement: '' },
  { regex: /\bdark:bg-paper\/5\b/g, replacement: '' },
  { regex: /\btext-black\b/g, replacement: 'text-foreground' },
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      // clean up multiple spaces
      content = content.replace(/  +/g, ' ');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

walk(path.join(process.cwd(), 'src'));
console.log('Finished updating colors across src folder');
