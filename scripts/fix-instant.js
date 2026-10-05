const fs = require('fs');
const path = require('path');

const files = [
  'src/app/[locale]/page.tsx',
  'src/app/[locale]/about/page.tsx',
  'src/app/[locale]/services/page.tsx',
  'src/app/[locale]/artists/page.tsx',
  'src/app/[locale]/gallery/page.tsx',
  'src/app/[locale]/contact/page.tsx',
];

for (const file of files) {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('export const instant = false;')) {
      content = 'export const instant = false;\n' + content;
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Fixed ' + file);
    }
  }
}
