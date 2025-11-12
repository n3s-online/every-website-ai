#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Checking favicon files...\n');

// Check local files
const faviconPaths = [
  'public/favicon.ico',
  'src/app/favicon.ico'
];

for (const path of faviconPaths) {
  const fullPath = join(rootDir, path);
  if (existsSync(fullPath)) {
    try {
      const { stdout } = await execAsync(`file "${fullPath}"`);
      const stats = await execAsync(`ls -lh "${fullPath}"`);
      console.log(`📁 ${path}:`);
      console.log(`   Type: ${stdout.trim().split(': ')[1]}`);
      console.log(`   Size: ${stats.stdout.trim().split(/\s+/)[4]}`);
      console.log('');
    } catch (error) {
      console.error(`   Error checking ${path}:`, error.message);
    }
  } else {
    console.log(`❌ ${path}: Not found\n`);
  }
}

// Check deployed version
console.log('🌐 Checking deployed favicon at everywebsite.app...\n');

try {
  const { stdout } = await execAsync(`curl -sI https://everywebsite.app/favicon.ico`);
  console.log('Response headers:');
  console.log(stdout);

  // Download and check the file
  const { stdout: fileOutput } = await execAsync(`curl -s https://everywebsite.app/favicon.ico | file -`);
  console.log('Deployed favicon type:');
  console.log(fileOutput);
} catch (error) {
  console.error('Error checking deployed favicon:', error.message);
}
