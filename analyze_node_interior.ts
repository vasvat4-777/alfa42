import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const targetIdx = js.indexOf('strokeDashoffset:$?0:55,style:{opacity:$?1:0,transition:"stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)');
if (targetIdx !== -1) {
  console.log('--- Found node inner detail ---');
  console.log(js.substring(targetIdx, targetIdx + 2000));
} else {
  console.log('--- Not found ---');
}
