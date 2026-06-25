import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// Let's search for "Общая площадь объекта:" to see how the area slider and pricing are handled.
const areaIdx = js.indexOf('Общая площадь объекта:');
if (areaIdx !== -1) {
  console.log('--- Found area label inside form ---');
  console.log(js.substring(areaIdx - 200, areaIdx + 1200));
} else {
  console.log('Area label not found');
}
