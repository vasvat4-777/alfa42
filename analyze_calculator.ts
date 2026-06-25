import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const calcIdx = js.indexOf('AP-v07sot');
if (calcIdx !== -1) {
  console.log('--- Found calculator ticket logic ---');
  console.log(js.substring(calcIdx - 500, calcIdx + 1500));
} else {
  // Let's search for "Ориентировочная стоимость"
  const priceIdx = js.indexOf('Ориентировочная стоимость');
  if (priceIdx !== -1) {
    console.log('--- Found price calculation ---');
    console.log(js.substring(priceIdx - 1000, priceIdx + 1000));
  } else {
    console.log('--- Calculator details not found ---');
  }
}
