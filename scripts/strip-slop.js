const fs = require('fs');
const path = require('path');

const slopPattern = /(shadow(-[a-zA-Z0-9]+)?|gradient(-[a-zA-Z0-9]+)?|uppercase|tracking-[a-zA-Z0-9-]+|animate-[a-zA-Z0-9-]+|transition-all|blur(-[a-zA-Z0-9]+)?|backdrop(-[a-zA-Z0-9]+)+|ring-offset(-[a-zA-Z0-9]+)?|border-dashed|text-center)\b/g;
// rounded- except rounded-[2px]
const roundedPattern = /rounded-(?!\[2px\])[a-zA-Z0-9-]+/g;

let count = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let matches1 = content.match(slopPattern);
      let matches2 = content.match(roundedPattern);
      
      let fileCount = (matches1 ? matches1.length : 0) + (matches2 ? matches2.length : 0);
      if (fileCount > 0) {
        count += fileCount;
        content = content.replace(slopPattern, '');
        content = content.replace(roundedPattern, '');
        // clean up multiple spaces
        content = content.replace(/  +/g, ' ');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

walk(path.join(process.cwd(), 'src'));
console.log('Total slop count:', count);
