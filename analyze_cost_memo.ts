import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// Let's search for the variable declaration of At inside the Booking Modal.
// We can find where `D` and `M` are defined near `useState` in the modal code.
const modalStartIdx = js.indexOf('function Th(');
if (modalStartIdx !== -1) {
  console.log('--- Found function Th (Booking Modal) ---');
  console.log(js.substring(modalStartIdx, modalStartIdx + 1500));
} else {
  console.log('function Th not found');
}
