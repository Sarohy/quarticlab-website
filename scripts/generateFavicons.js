/**
 * Generates Quartic Lab favicons from the brand mark SVG.
 * Run with: node scripts/generateFavicons.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");

// Quartic Lab mark SVG — oklch version for modern browsers
const markSvgBrowser = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
<rect width="100" height="100" fill="oklch(20% 0.05 255)"/>
<line x1="50" y1="18" x2="82" y2="50" stroke="oklch(95% 0.018 75)" stroke-width="1.6" stroke-linecap="round"/>
<line x1="50" y1="18" x2="50" y2="82" stroke="oklch(95% 0.018 75)" stroke-width="1.6" stroke-linecap="round"/>
<line x1="50" y1="18" x2="18" y2="50" stroke="oklch(95% 0.018 75)" stroke-width="1.6" stroke-linecap="round"/>
<line x1="82" y1="50" x2="50" y2="82" stroke="oklch(95% 0.018 75)" stroke-width="1.6" stroke-linecap="round"/>
<line x1="82" y1="50" x2="18" y2="50" stroke="oklch(95% 0.018 75)" stroke-width="1.6" stroke-linecap="round"/>
<line x1="50" y1="82" x2="18" y2="50" stroke="oklch(95% 0.018 75)" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="50" cy="18" r="6.5" fill="oklch(58% 0.12 45)" stroke="oklch(20% 0.05 255)" stroke-width="2"/>
<circle cx="82" cy="50" r="6.5" fill="oklch(95% 0.018 75)" stroke="oklch(20% 0.05 255)" stroke-width="2"/>
<circle cx="50" cy="82" r="6.5" fill="oklch(95% 0.018 75)" stroke="oklch(20% 0.05 255)" stroke-width="2"/>
<circle cx="18" cy="50" r="6.5" fill="oklch(95% 0.018 75)" stroke="oklch(20% 0.05 255)" stroke-width="2"/>
</svg>`;

// Hex equivalents for sharp/libvips which cannot render oklch()
// oxford #05162c = oklch(20% 0.05 255)
// linen  #f6ede2 = oklch(95% 0.018 75)
// copper #b36139 = oklch(58% 0.12 45)
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
<rect width="100" height="100" fill="#05162c"/>
<line x1="50" y1="18" x2="82" y2="50" stroke="#f6ede2" stroke-width="1.6" stroke-linecap="round"/>
<line x1="50" y1="18" x2="50" y2="82" stroke="#f6ede2" stroke-width="1.6" stroke-linecap="round"/>
<line x1="50" y1="18" x2="18" y2="50" stroke="#f6ede2" stroke-width="1.6" stroke-linecap="round"/>
<line x1="82" y1="50" x2="50" y2="82" stroke="#f6ede2" stroke-width="1.6" stroke-linecap="round"/>
<line x1="82" y1="50" x2="18" y2="50" stroke="#f6ede2" stroke-width="1.6" stroke-linecap="round"/>
<line x1="50" y1="82" x2="18" y2="50" stroke="#f6ede2" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="50" cy="18" r="6.5" fill="#b36139" stroke="#05162c" stroke-width="2"/>
<circle cx="82" cy="50" r="6.5" fill="#f6ede2" stroke="#05162c" stroke-width="2"/>
<circle cx="50" cy="82" r="6.5" fill="#f6ede2" stroke="#05162c" stroke-width="2"/>
<circle cx="18" cy="50" r="6.5" fill="#f6ede2" stroke="#05162c" stroke-width="2"/>
</svg>`;

// Save oklch SVG for modern browsers
fs.writeFileSync(path.join(publicDir, "favicon.svg"), markSvgBrowser, "utf8");
console.log("✓ favicon.svg written");

async function generate() {
  const svgBuffer = Buffer.from(markSvg);

  // 32×32 — used in <link rel="icon" sizes="32x32">
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));
  console.log("✓ favicon-32x32.png");

  // 16×16 — used in <link rel="icon" sizes="16x16">
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, "favicon-16x16.png"));
  console.log("✓ favicon-16x16.png");

  // 180×180 — apple-touch-icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png");

  // 192×192 — android chrome / web app manifest
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "android-chrome-192x192.png"));
  console.log("✓ android-chrome-192x192.png");

  // Build minimal ICO (2 embedded PNGs: 16 + 32)
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const ico = buildIco([png16, png32]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  console.log("✓ favicon.ico (replaced with Quartic Lab mark)");
}

/**
 * Builds a minimal ICO file from an array of PNG buffers.
 * ICO format: ICONDIR header + ICONDIRENTRY per image + image data.
 */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * count;

  // Calculate offsets for each image
  const offsets = [];
  let offset = dirSize;
  for (const buf of pngBuffers) {
    offsets.push(offset);
    offset += buf.length;
  }

  const totalSize = offset;
  const result = Buffer.alloc(totalSize);

  // ICONDIR: reserved(2) + type(2) + count(2)
  result.writeUInt16LE(0, 0); // reserved
  result.writeUInt16LE(1, 2); // type: 1 = ICO
  result.writeUInt16LE(count, 4);

  // ICONDIRENTRY per image
  for (let i = 0; i < count; i++) {
    const buf = pngBuffers[i];
    // Determine size from PNG IHDR (bytes 16–23)
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    const entryOffset = headerSize + i * entrySize;
    result.writeUInt8(w >= 256 ? 0 : w, entryOffset); // width (0 = 256)
    result.writeUInt8(h >= 256 ? 0 : h, entryOffset + 1); // height
    result.writeUInt8(0, entryOffset + 2); // color count
    result.writeUInt8(0, entryOffset + 3); // reserved
    result.writeUInt16LE(1, entryOffset + 4); // planes
    result.writeUInt16LE(32, entryOffset + 6); // bit count
    result.writeUInt32LE(buf.length, entryOffset + 8); // size of image data
    result.writeUInt32LE(offsets[i], entryOffset + 12); // offset of image data
  }

  // Write image data
  let dataOffset = dirSize;
  for (const buf of pngBuffers) {
    buf.copy(result, dataOffset);
    dataOffset += buf.length;
  }

  return result;
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
