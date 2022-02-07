class BooleanCells {
  constructor(m, n, element, cellsMap) {
    if (m < 2 || n < 2) {
      throw new Error('Not a proper field, sorry!');
    } else {
      this.width = m;
      this.height = n;
      this.element = element;
      // Генерация поля случайным образом если запуск был не через загрузку файла
      this.cellsMap = cellsMap || this.mapCreation();
    }
  }

  launchGame() {
    // Отрисовка стартового поля
    this.tiles = this.startingRender();
    // Перерасчет и переотрисовка поля с первого элемента начинается раз в секунду
    this.interval = setInterval(() => {
      this.cellsMap = this.recalculateMap(this.cellsMap, this.height);
    }, 1000);
  }

  // Метод для создания изначального мэпа с информацией о жизни клеток в поле
  mapCreation() {
    const numberOfCells = this.width * this.height;
    const cellsMap = new Map();
    for (let i = 1; i <= numberOfCells; i += 1) {
      if (Math.random() > 0.5) {
        cellsMap.set(i, true);
      } else {
        cellsMap.set(i, false);
      }
    }
    return cellsMap;
  }

  // Метод для стартовой отрисовки поля и ячеек
  startingRender() {
    let stringToInsert = '';
    let cell = 1;
    // Код получился достаточно сложный но исполняется только при первой отрисовке
    for (let i = 0; i < this.width; i += 1) {
      stringToInsert += '<div class="column">';
      for (let k = 0; k < this.height; k += 1) {
        if (this.cellsMap.get(cell) === true) {
          stringToInsert += '<div class="tile tile-alive"></div>';
        } else {
          stringToInsert += '<div class="tile tile-dead"></div>';
        }
        cell += 1;
      }
      stringToInsert += '</div>';
    }
    this.element.insertAdjacentHTML('afterbegin', stringToInsert);
    return Array.from(this.element.querySelectorAll('.tile'));
  }

  // Метод для перерасчета мэпа с информацией о жизни клеток в поле
  recalculateMap() {
    // Копия мэпа для внесения правок на лету, без правок по ссылке аргумента
    const resultMap = new Map(this.cellsMap);
    // Цикл идущий по ключам и значениям оригинального мэпа
    for (const [cell, value] of this.cellsMap.entries()) {
      // Переменная хранящая информацию о фактических соседях
      let closeAliveCells = 0;
      // Проверка следующей снизу с проверкой нахождения в нужном столбце через кратность
      if (this.cellsMap.get(cell + 1) === true && cell % this.height !== 0) {
        closeAliveCells += 1;
      }
      // Проверка предыдущей сверху с проверкой нахождения в нужном столбце через кратность
      if (this.cellsMap.get(cell - 1) === true && cell % this.height !== 0) {
        closeAliveCells += 1;
      }
      // Проверка ячейки справа
      if (this.cellsMap.get(cell + this.height) === true) {
        closeAliveCells += 1;
      }
      // Проверка ячейки слева
      if (this.cellsMap.get(cell - this.height) === true) {
        closeAliveCells += 1;
      }
      // Проверка ячейки справа снизу с проверкой нахождения в нужном столбце через кратность
      if (this.cellsMap.get(cell + this.height + 1) === true && cell % this.height !== 0) {
        closeAliveCells += 1;
      }
      // Проверка ячейки справа сверху с проверкой нахождения в нужном столбце через кратность
      if (this.cellsMap.get(cell + this.height - 1) === true && (cell - 1) % this.height !== 0) {
        closeAliveCells += 1;
      }
      // Проверка ячейки слева снизу с проверкой нахождения в нужном столбце через кратность
      if (this.cellsMap.get(cell - this.height + 1) === true && cell % this.height !== 0) {
        closeAliveCells += 1;
      }
      // Проверка ячейки слева сверху с проверкой нахождения в нужном столбце через кратность
      if (this.cellsMap.get(cell - this.height - 1) === true && (cell - 1) % this.height !== 0) {
        closeAliveCells += 1;
      }
      // Проверка переменной состояния соседей и принятие решения о жизни текущей клетки
      if (value === false && closeAliveCells >= 3) {
        resultMap.set(cell, true);
        // Переотрисовка живой клетки
        this.tiles[cell - 1].classList.remove('tile-dead');
        this.tiles[cell - 1].classList.add('tile-alive');
      }
      if (value === true && (closeAliveCells < 2 || closeAliveCells > 3)) {
        resultMap.set(cell, false);
        // Переотрисовка мертвой клетки
        this.tiles[cell - 1].classList.remove('tile-alive');
        this.tiles[cell - 1].classList.add('tile-dead');
      }
    }
    return resultMap;
  }
}

export default BooleanCells;
