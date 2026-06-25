import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const audioIdx = js.indexOf('isMuted');
if (audioIdx !== -1) {
  console.log('--- Found isMuted / audio details ---');
  console.log(js.substring(audioIdx - 500, audioIdx + 1500));
} else {
  console.log('--- isMuted not found ---');
}
