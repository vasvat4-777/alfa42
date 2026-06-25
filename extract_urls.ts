import fs from 'fs';

const content = fs.readFileSync('fetched_js.js', 'utf8');

// Find all URLs (images, SVGs, webp, png, jpg)
const imageRegex = /["'`]([^"'`]+\.(?:png|jpg|jpeg|webp|svg|gif|json|mp4))["'`]/g;
const urls = [];
let match;
while ((match = imageRegex.exec(content)) !== null) {
  urls.push(match[1]);
}

const uniqueUrls = Array.from(new Set(urls));
fs.writeFileSync('extracted_urls.json', JSON.stringify(uniqueUrls, null, 2));
console.log(`Extracted ${uniqueUrls.length} asset URLs.`);
