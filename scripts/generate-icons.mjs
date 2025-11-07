import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

// Read the SVG file
const svgBuffer = readFileSync(join(publicDir, 'logo.svg'));

async function generateIcons() {
  console.log('Generating icon files...');

  try {
    // Generate logo.png (512x512)
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'logo.png'));
    console.log('✓ Generated logo.png');

    // Generate apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));
    console.log('✓ Generated apple-touch-icon.png');

    // Generate favicon-32x32.png
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon-32x32.png'));
    console.log('✓ Generated favicon-32x32.png');

    // Generate favicon-16x16.png
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(join(publicDir, 'favicon-16x16.png'));
    console.log('✓ Generated favicon-16x16.png');

    // Generate android-chrome icons
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(join(publicDir, 'android-chrome-192x192.png'));
    console.log('✓ Generated android-chrome-192x192.png');

    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'android-chrome-512x512.png'));
    console.log('✓ Generated android-chrome-512x512.png');

    // Create a simplified favicon.svg (copy of logo.svg)
    const faviconSvg = readFileSync(join(publicDir, 'logo.svg'), 'utf-8');
    writeFileSync(join(publicDir, 'favicon.svg'), faviconSvg);
    console.log('✓ Generated favicon.svg');

    // Generate ICO file (combining 16x16, 32x32, and 48x48)
    const favicon48Buffer = await sharp(svgBuffer)
      .resize(48, 48)
      .png()
      .toBuffer();

    // For ICO, we'll just use a 32x32 PNG as favicon.ico
    // (proper multi-resolution ICO would require a specialized library)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico');

    console.log('\n✅ All icon files generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
