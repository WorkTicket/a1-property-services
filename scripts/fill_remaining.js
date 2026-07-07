const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images');

// For remaining missing images, copy from best-matching existing premium image
const copies = [
  { from: 'services-hero', to: 'gallery-hero' },
  { from: 'about-hero', to: 'contact-page-hero' },
  { from: 'service-lawn-care', to: 'sprinklers' },
  { from: 'service-lawn-care', to: 'service-hydroseeding' },
  // Custom hero asset in public/images
  // { from: 'service-lawn-care', to: 'service-sod-installation' },
  { from: 'city-intro', to: 'service-drainage' },
  { from: 'about-secondary', to: 'service-preservation-restoration' },
  { from: 'service-grading', to: 'service-snow-removal' },
  { from: 'hardscape-ponds-water-features', to: 'water-feature-image-1' },
  { from: 'about-hero', to: 'city-why' },
  { from: 'retaining-wall', to: 'hardscape-retaining-walls' },
  { from: 'paver-patio-hero', to: 'hardscape-paver-patio' },
  { from: 'service-residential-landscaping', to: 'service-landscape-maintenance' },
];

async function copyImage(fromName, toName) {
  const fromWebp = path.join(dir, fromName + '.webp');
  const fromAvif = path.join(dir, fromName + '.avif');
  const toWebp = path.join(dir, toName + '.webp');
  const toAvif = path.join(dir, toName + '.avif');

  if (fs.existsSync(toWebp) && fs.statSync(toWebp).size > 1000) {
    console.log('SKIP: ' + toName);
    return;
  }

  if (!fs.existsSync(fromWebp)) {
    console.log('MISSING SOURCE: ' + fromName);
    return;
  }

  await sharp(fromWebp).toFile(toWebp).catch(() => {});
  await sharp(fromWebp).avif({ quality: 80 }).toFile(toAvif).catch(() => {});
  console.log('OK: ' + toName + ' <- ' + fromName);
}

(async () => {
  for (const c of copies) {
    await copyImage(c.from, c.to);
  }
  console.log('ALL DONE');
})();
