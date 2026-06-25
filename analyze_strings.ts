import fs from 'fs';

const text = JSON.parse(fs.readFileSync('extracted_text.json', 'utf8'));
console.log(`Total strings: ${text.length}`);

// Find strings that look like headings or titles (usually shorter, all uppercase or camelcase)
const headings = text.filter((s: string) => s.length < 50 && (s.includes('!') || s.includes('?') || s.toUpperCase() === s || s.split(' ').length <= 4));
console.log('--- Sample Short UI Strings ---');
console.log(headings.slice(0, 50));
