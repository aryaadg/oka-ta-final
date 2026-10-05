const fs = require('fs');
const file = 'src/app/[locale]/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const regex = /<div className="inline-flex items-center gap-2 px-3 py-1 bg-stencil\/20 border border-gym-gold\/40 text-gym-gold rounded-\[2px\]">[\s\S]*?<\/div>/;
c = c.replace(regex, '');

c = c.replace('text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-muted-foreground', 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground');

fs.writeFileSync(file, c);
