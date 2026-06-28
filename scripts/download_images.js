const sharp = require('sharp');
const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const tempDir = process.env.TEMP;

// Direct Unsplash CDN URLs with photo IDs
const downloads = [
  { id: 'jQ783S3vpTg', name: 'services-hero' },
  { id: 'spuEkBMaBmk', name: 'about-hero' },
  { id: 'PWOPnSRPHYI', name: 'about-primary' },
  { id: 'bQo7dlBI5DE', name: 'about-secondary' },
  { id: 'GdOO7mrlsNY', name: 'service-landscape-design' },
  { id: '0ROvhxdvVbc', name: 'service-lawn-care' },
  { id: 'ZG-1o1R2YQ0', name: 'service-tree-service' },
  { id: 'AB_TBnAjjTg', name: 'service-grading' },
  { id: 'Cmkb8xnGmlE', name: 'service-rock-landscaping' },
  { id: 'dwynnPTeRt8', name: 'service-excavation' },
  { id: '-UOiKGfzxXY', name: 'service-outdoor-living' },
  { id: 'aA1k6WHyeaw', name: 'service-landscape-installation' },
  { id: 'UXKae28WhUk', name: 'service-commercial-landscaping' },
  { id: '55oQsZ96cas', name: 'service-tree-planting' },
  { id: 'xwgkJI4bShM', name: 'service-mulching' },
  { id: 'r5_7Zc_E5zU', name: 'service-residential-landscaping' },
  { id: '7MXS06qhhDU', name: 'service-shrub-installation' },
  { id: 'IXficxqi8OI', name: 'hardscape-ponds-water-features' },
  { id: 'f7poIvVWtfg', name: 'city-intro' },
  { id: 'QyFeu_btajA', name: 'gallery-hero' },
];

function downloadCdn(photoId, dest) {
  return new Promise((resolve, reject) => {
    // Use the Unsplash download endpoint which redirects to CDN
    const url = 'https://unsplash.com/photos/' + photoId + '/download?force=true';
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      // Handle redirect
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r2) => {
          r2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function processOne(item) {
  const webpPath = path.join(imagesDir, item.name + '.webp');
  if (fs.existsSync(webpPath) && fs.statSync(webpPath).size > 1000) {
    console.log('SKIP: ' + item.name);
    return;
  }
  const jpgPath = path.join(tempDir, item.name + '.jpg');
  
  try {
    await downloadCdn(item.id, jpgPath);
    const stat = fs.statSync(jpgPath);
    if (stat.size === 0) { console.log('EMPTY: ' + item.name); return; }
    console.log('DL: ' + item.name + ' (' + stat.size + ' bytes)');
    await sharp(jpgPath).resize(1920, null, { withoutEnlargement: true }).webp({ quality: 85 }).toFile(webpPath);
    console.log('WEBP: ' + item.name);
    await sharp(jpgPath).resize(1920, null, { withoutEnlargement: true }).avif({ quality: 80 }).toFile(webpPath.replace('.webp', '.avif'));
    console.log('OK: ' + item.name);
  } catch (e) {
    console.log('FAIL: ' + item.name + ' - ' + e.message);
  }
}

(async () => {
  for (const item of downloads) {
    await processOne(item);
  }
  console.log('ALL DONE');
})();
