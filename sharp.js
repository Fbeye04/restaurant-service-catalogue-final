/* eslint-disable no-undef */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'src/public/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Versi desktop dengan kompresi
sharp(`${target}/hero-image_1.jpg`)
  .resize(1200)
  .jpeg({
    quality: 80,
    progressive: true,
    force: true,
  })
  .toFile(path.resolve(__dirname, `${destination}/hero-image_1-large.jpg`))
  .then((info) => {
    console.log('Large image generated:', info);
  })
  .catch((err) => {
    console.error('Error generating large image:', err);
  });

// Versi mobile dengan kompresi
sharp(`${target}/hero-image_1.jpg`)
  .resize(600)
  .jpeg({
    quality: 80,
    progressive: true,
    force: true,
  })
  .toFile(path.resolve(__dirname, `${destination}/hero-image_1-small.jpg`))
  .then((info) => {
    console.log('Small image generated:', info);
  })
  .catch((err) => {
    console.error('Error generating small image:', err);
  });
