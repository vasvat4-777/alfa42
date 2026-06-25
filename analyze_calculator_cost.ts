import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const costIdx = js.indexOf('РАСЧЕТ СМЕТЫ И ПОДГОТОВКА СМЕТНЫХ УСЛОВИЙ');
if (costIdx !== -1) {
  console.log('--- Found calculator cost calculation ---');
  console.log(js.substring(costIdx - 1500, costIdx));
}
