import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

function searchAround(query: string, length = 1000) {
  const idx = js.indexOf(query);
  if (idx !== -1) {
    console.log(`--- Match for "${query}" ---`);
    console.log(js.substring(Math.max(0, idx - 200), Math.min(js.length, idx + length)));
  } else {
    console.log(`--- No match for "${query}" ---`);
  }
}

searchAround('Выберите режим освещения купола');
searchAround('Интерактивный конфигуратор материалов');
searchAround('От чертежа к фотореализму');
