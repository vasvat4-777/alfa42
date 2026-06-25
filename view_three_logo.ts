import fs from 'fs';

const content = fs.readFileSync('extracted_srcdoc.html', 'utf8');
console.log('--- Head of extracted_srcdoc.html ---');
console.log(content.substring(0, 1000));
console.log('--- Tail of extracted_srcdoc.html ---');
console.log(content.substring(content.length - 1000));
