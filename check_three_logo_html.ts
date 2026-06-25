import fs from 'fs';

const content = fs.readFileSync('public/three_logo.html', 'utf8');
console.log('--- Tail of FIXED three_logo.html ---');
console.log(content.substring(content.length - 1000));
