import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// Search for strings/arrays containing material names
const marbleIdx = js.indexOf('Премиальный белый итальянский мрамор');
if (marbleIdx !== -1) {
  console.log('--- Found marble ---');
  console.log(js.substring(marbleIdx - 200, marbleIdx + 1000));
} else {
  console.log('--- Marble not found ---');
}

// Search for the CAD slider content / tabs definition
const exteriorSliderIdx = js.indexOf('Загородное поместье с многослойным вечерним');
if (exteriorSliderIdx !== -1) {
  console.log('--- Found slider texts ---');
  console.log(js.substring(exteriorSliderIdx - 200, exteriorSliderIdx + 1000));
}
