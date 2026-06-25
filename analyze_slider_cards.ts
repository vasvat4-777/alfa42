import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const ptIdx = js.indexOf('pt-12",children:[');
if (ptIdx !== -1) {
  console.log('--- Found slider cards ---');
  console.log(js.substring(ptIdx, ptIdx + 1500));
} else {
  // Let's try searching for the words "Экстерьеры" or "Интерьеры" in the card definitions
  const wordIdx = js.indexOf('desc:"Загородное поместье с многослойным вечерним');
  if (wordIdx !== -1) {
    console.log('--- Found card texts ---');
    console.log(js.substring(wordIdx - 300, wordIdx + 1200));
  } else {
    console.log('--- Card texts not found ---');
  }
}
