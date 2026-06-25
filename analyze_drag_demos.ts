import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

function findRendering(keyword: string) {
  const idx = js.indexOf(keyword);
  if (idx !== -1) {
    console.log(`--- Match for "${keyword}" ---`);
    console.log(js.substring(Math.max(0, idx - 100), Math.min(js.length, idx + 1200)));
  } else {
    console.log(`--- No match for "${keyword}" ---`);
  }
}

findRendering('type==="tour-360"');
findRendering('type==="model-rotate"');
