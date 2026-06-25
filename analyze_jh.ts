import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const jhIdx = js.indexOf('function jh(');
if (jhIdx !== -1) {
  console.log('--- Found function jh ---');
  console.log(js.substring(jhIdx, jhIdx + 1500));
} else {
  console.log('--- function jh not found ---');
}
