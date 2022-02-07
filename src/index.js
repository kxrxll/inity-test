import './css/styles.css';
import BooleanCells from './js/app';
import csvToGameData from './js/parser';

const button = document.querySelector('button');
const inputElement = document.querySelector('input');

inputElement.addEventListener('change', (e) => {
  e.preventDefault();
  const input = inputElement.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    const text = evt.target.result;
    const [cellsMap, width, height] = csvToGameData(text);
    document.querySelector('.main').innerHTML = '';
    const booleanCells = new BooleanCells(width, height, document.querySelector('.main'), cellsMap);
    booleanCells.launchGame();
  };
  reader.readAsText(input);
});

button.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.main').innerHTML = '';
  const booleanCells = new BooleanCells(100, 100, document.querySelector('.main'));
  booleanCells.launchGame();
});
