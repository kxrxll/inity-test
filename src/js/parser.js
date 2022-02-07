// Функция обрабатываяющая csv файл, требования к файлу – разделитель ';'
function csvToGameData(str) {
  const data = str.replaceAll('\r', '').split('\n');
  const arr = [];
  data.forEach((element) => {
    arr.push(element.split(';'));
  });
  const height = arr.length;
  // Допущение: клетки в файле заполняют прямоугольник, поэтому ширина взята по первому ряду
  const width = arr[0].length;
  let cellsName = 1;
  const cellsMap = new Map();
  for (let i = 0; i < width; i += 1) {
    for (let k = 0; k < height; k += 1) {
      cellsMap.set(cellsName, arr[k][i]);
      cellsName += 1;
    }
  }
  return [cellsMap, width, height];
}

export default csvToGameData;
