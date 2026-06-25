import fs from 'fs';

const content = fs.readFileSync('fetched_js.js', 'utf8');

// Find all strings containing Russian characters
const matches = content.match(/"[^"]*[\u0400-\u04FF]+[^"]*"/g) || [];
const singleQuoteMatches = content.match(/'[^']*[\u0400-\u04FF]+[^']*'/g) || [];
const templateMatches = content.match(/`[^`]*[\u0400-\u04FF]+[^`]*`/g) || [];

const allText = [...matches, ...singleQuoteMatches, ...templateMatches];
fs.writeFileSync('extracted_text.json', JSON.stringify(Array.from(new Set(allText)), null, 2));
console.log(`Extracted ${allText.length} Cyrillic strings.`);
