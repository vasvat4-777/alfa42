import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const orderIdx = js.indexOf('children:"ЗАКАЗАТЬ"');
if (orderIdx !== -1) {
  console.log('--- Found order back text ---');
  console.log(js.substring(orderIdx, orderIdx + 800));
}
