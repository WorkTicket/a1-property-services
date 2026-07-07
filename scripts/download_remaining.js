const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

const remaining = [
  { id: '4S_IaJ88a8I', name: 'service-snow-removal' },
  // Custom hero asset in public/images (not Unsplash)
  // { id: 'fKev7-jg3xw', name: 'service-sod-installation' },
  { id: 'TZ3bAK2620E', name: 'water-feature-image-1' },
  { id: 'UlR7PfVCmgs', name: 'sprinklers' },
  { id: 'SCT4qJD_2ew', name: 'service-drainage' },
  { id: 'krLrlHu1LLY', name: 'gallery-hero' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function main() {
  for (const item of remaining) {
    const webpPath = path.join(imagesDir, item.name + '.webp');
    if (fs.existsSync(webpPath) && fs.statSync(webpPath).size > 1000) {
      console.log('SKIP: ' + item.name);
      continue;
    }
    const jpgPath = path.join(process.env.TEMP, item.name + '.jpg');
    const url = 'https://unsplash.com/photos/' + item.id + '/download?force=true';
    try {
      await download(url, jpgPath);
      const stat = fs.statSync(jpgPath);
      console.log('OK: ' + item.name + ' (' + stat.size + ' bytes)');
    } catch (e) {
      console.log('FAIL: ' + item.name + ' - ' + e.message);
    }
  }
  console.log('DONE');
}
main();
