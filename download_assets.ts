import fs from 'fs';
import path from 'path';

async function download(url: string, dest: string) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`Downloaded ${url} -> ${dest}`);
}

async function run() {
  try {
    await download(
      'https://vo7sot-alfa4.layero.ru/assets/portfolio_exterior_dusk_1782123154027-Bxj_yHxb.jpg',
      './public/assets/portfolio_exterior_dusk.jpg'
    );
    await download(
      'https://vo7sot-alfa4.layero.ru/assets/portfolio_interior_luxury_1782123170357-CcgbGQbR.jpg',
      './public/assets/portfolio_interior_luxury.jpg'
    );
    await download(
      'https://vo7sot-alfa4.layero.ru/assets/luxury_dark_mansion_interior_1782123130408-CW4myfYe.jpg',
      './public/assets/luxury_dark_mansion_interior.jpg'
    );
  } catch (error) {
    console.error('Download failed:', error);
  }
}

run();
