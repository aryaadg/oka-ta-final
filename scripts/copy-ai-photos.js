const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\b3ccfe6c-bef1-4509-80a0-8feef86cedc7';
const destDir = 'public\\temp';

// Map: generated file prefix -> destination filename
const copies = [
  { prefix: 'artist_budi', dest: 'artist-1.jpg' },
  { prefix: 'artist_wayan', dest: 'artist-2.jpg' },
  { prefix: 'artist_sari', dest: 'artist-3.jpg' },
  { prefix: 'tattoo_fineline_botanical', dest: 'gallery-1.jpg' },
  { prefix: 'tattoo_blackwork_snake', dest: 'gallery-2.jpg' },
  { prefix: 'tattoo_realism_portrait', dest: 'gallery-3.jpg' },
  { prefix: 'tattoo_geometric_arm', dest: 'gallery-4.jpg' },
  { prefix: 'tattoo_ornamental_spine', dest: 'gallery-5.jpg' },
  { prefix: 'tattoo_tiger_realism', dest: 'gallery-6.jpg' },
  { prefix: 'tattoo_script_lettering', dest: 'gallery-7.jpg' },
  { prefix: 'hero_studio', dest: 'hero-1.jpg' },
  { prefix: 'about_studio_interior', dest: 'about-1.jpg' },
];

copies.forEach(({ prefix, dest }) => {
  const files = fs.readdirSync(artifactDir).filter(f => f.startsWith(prefix) && f.endsWith('.png'));
  if (files.length === 0) {
    console.log(`SKIP: no file found for prefix "${prefix}"`);
    return;
  }
  const src = path.join(artifactDir, files[files.length - 1]); // take latest
  const dstPath = path.join(destDir, dest);
  fs.copyFileSync(src, dstPath);
  console.log(`OK  ${files[files.length - 1]} -> ${dstPath}`);
});

console.log('\nDone copying photos!');
