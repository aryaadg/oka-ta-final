const fs = require('fs');
const file = 'src/components/site/Footer.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/text-muted-foreground/g, 'text-gray-400');
c = c.replace(/text-graphite/g, 'text-gray-500');

fs.writeFileSync(file, c);
