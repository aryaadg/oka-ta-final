const fs = require('fs');
const path = require('path');
const https = require('https');

const slots = [
  { name: 'hero-1', w: 1200, h: 800 },
  { name: 'about-1', w: 1200, h: 800 },
  { name: 'about-2', w: 1200, h: 800 },
  { name: 'about-3', w: 1200, h: 800 },
  { name: 'artist-1', w: 800, h: 800 },
  { name: 'artist-2', w: 800, h: 800 },
  { name: 'artist-3', w: 800, h: 800 },
];

for (let i = 1; i <= 12; i++) {
  slots.push({ name: `gallery-${i}`, w: 800, h: 1000 });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const s of slots) {
    const url = `https://picsum.photos/seed/${s.name}/${s.w}/${s.h}`;
    const dest = path.join(process.cwd(), 'public', 'temp', `${s.name}.jpg`);
    console.log(`Downloading ${url} to ${dest}`);
    await download(url, dest);
  }
  console.log('Done');
}

run();
