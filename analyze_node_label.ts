import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const targetIdx = js.indexOf('style:{clipPath:"polygon(50% 50%, 0% 25%, 0% 75%, 50% 100%)",background:"linear-gradient(225deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.55) 100%)",opacity:$?1:0}}),c.jsx("div",{className:"absolute inse');
if (targetIdx !== -1) {
  console.log('--- Found node label ---');
  console.log(js.substring(targetIdx, targetIdx + 1500));
} else {
  // Let's do a simpler search
  const backupIdx = js.indexOf('className:"absolute inset-0 transition-opacity duration-700 pointer-events-none z-10",style:{clipPath:"polygon(50% 50%, 0% 25%, 0% 75%, 50% 100%)"');
  if (backupIdx !== -1) {
    console.log('--- Found node label (backup) ---');
    console.log(js.substring(backupIdx, backupIdx + 1500));
  } else {
    // Let's search for "p.service.titleRu" or "Tt.titleRu"
    const textIdx = js.indexOf('Tt.titleRu');
    if (textIdx !== -1) {
      console.log('--- Found textIdx ---');
      console.log(js.substring(textIdx - 400, textIdx + 1200));
    }
  }
}
