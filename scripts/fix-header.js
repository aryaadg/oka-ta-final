const fs = require('fs');
const file = 'src/components/site/Header.tsx';
let c = fs.readFileSync(file, 'utf8');

// Desktop
c = c.replace(/<Link href=\{\`\/\$\{locale\}\/contact\`\}>[\s\S]*?<\/Link>/m, '');
// Mobile
c = c.replace(/<div className="pt-2">[\s\S]*?<\/div>\s*<\/div>\s*\)}/m, '  </div>\n  )}');

fs.writeFileSync(file, c);
