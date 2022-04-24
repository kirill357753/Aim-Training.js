/* Получаем основные элементы с HTML */
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

/* Создаем массив с цветовой гаммой */
const colors = ['#6fa2dd', '#996fdd', '#dd6fdd', '#d8565d',
  '#56d8d1', '#56d87d', '#b5d856', '#d8aa56', '#16661d'];

/* Создаем переменные вермени и очков */
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');

})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');

    startGame();
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
      
  }
})

// функция по запуску игры
function startGame() {
  // после запуска игры через секунду начать отсче
  setInterval(decreaseTime, 1000);
  // создаем рандомно наш кружок
  createRandomCircle();
  // передаем время которое мы выбрали для игры
  setTime(time);
}

// Фукнция по логике счетчика и созданию current
function decreaseTime() {
  // если время СТРОГО равно нулю
  if (time === 0) {
    finishGame() // вызвать функцию завершить игру
  } else {
    // иначе если time не равно нулю и уменшьим его на 1
    let current = --time;
    console.log(current);
    // если внутри карент число меньше 10
    if (current < 10) {
      current = `0${current}`;
    }
    // поместить в функцию отображения времени на игру
    setTime(current);
  }
}

// функция для добавления времени и отобрежения времени
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

// функция для завершения игры
function finishGame() {
    board.innerHTML = `<h1>Ваш счет: ${score}</h1>`;
}

/* Функция создания рандомно кружка на поле */
function createRandomCircle() {
  /* создаем в блок в который будет записан кружок */
  const circle = document.createElement('div'); // JS
  /* размер кружка получаем рандомно от 10 до 60 */
  const size = getRandomNumber(10, 60); // javascript
  /* Возращаем размер поля 500px */
  const {width, height} = board.getBoundingClientRect(); // JS
  // const width = board.getBoundingClientRect()
  // const height = board.getBoundingClientRect()
  // width = 500px
  // height = 500px
   
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  setColor(circle); // javascript определили ему цвет фона
 
  circle.classList.add('circle'); // JS
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
    /* Поле игровое добавь кружок */
  board.append(circle);
}

/* Создаем рандомную функцию от минимум до максимум */
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/* Функция принимает аргумент и меняет фон */
function setColor(element) {
    /* Создаем переменную color и записываем в нее цвет из функции */
    const color = getRandomColor();
    /* присваиваем ее фон получившийся цвет */
    element.style.background = color;   
}

/* создаем функцию которая возвращает индекс цвета */
function getRandomColor() {
    /* в индекс помещаем цифру от 0 до длинны массива колорс */
    
    /* const index = Math.floor(Math.random() * colors.length); // 1 вариант */

    const index = getRandomNumber(0, colors.length - 1); // 2 вариант

    /* взвращаем массив с индексом, тоесть цвет */
    return colors[index];
  }



