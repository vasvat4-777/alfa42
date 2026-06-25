import fs from 'fs';

async function run() {
  try {
    console.log('Fetching assets...');
    const jsResponse = await fetch('https://vo7sot-alfa4.layero.ru/assets/index-CQqZakrA.js');
    console.log('JS Status:', jsResponse.status);
    const js = await jsResponse.text();
    fs.writeFileSync('fetched_js.js', js);
    
    const cssResponse = await fetch('https://vo7sot-alfa4.layero.ru/assets/index-GwEFmUK5.css');
    console.log('CSS Status:', cssResponse.status);
    const css = await cssResponse.text();
    fs.writeFileSync('fetched_css.css', css);
    
    console.log('Done!');
  } catch (error: any) {
    console.error('Error fetching assets:', error);
  }
}

run();
