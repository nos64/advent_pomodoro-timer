const startStopBtn = document.querySelector('.start-stop-btn');
const startStopBtnText = document.querySelector('.start-stop-btn-text');
const gear = document.querySelector('.gear');
const eclipse = document.querySelector('.ecllipse-third');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');



// Нажатие на кнопку START/STOP
startStopBtn.addEventListener('click', () => {
  addZero()
  if (startStopBtn.textContent === 'START') {
    startTimer()
    startStopBtn.textContent = 'STOP';
  } else {
    startStopBtn.textContent = 'START';
    stopTimer()  
  } 
});

// Нажатие на шестеренку (изменение времени таймера)
gear.addEventListener('click', () => { 
  addZero()
  substringTime()
  if (startStopBtn.textContent = 'STOP') {
    stopTimer() 
    startStopBtnText.classList.toggle('start-stop-btn-text-edit'); //Убираем Старт/Стоп
    startStopBtn.textContent = 'START'
  }
  gear.classList.toggle('gear-edit'); //Меняем шестеренку на галку
  startStopBtn.classList.toggle('start-stop-btn-text-edit'); //Убираем Старт/Стоп
  eclipse.classList.toggle('ecllipse-third-edit'); // Меняем цвет круга
  minutes.classList.toggle('time-edit'); //Добавляем подчеркивание минутам
  seconds.classList.toggle('time-edit'); //Добавляем подчеркивание секундам
  minutes.disabled = false; // Разешаем редактировать минуты
  seconds.disabled = false;// Разешаем редактировать секунлы

  if(gear.classList.contains('gear-edit')) { //Проверка возможности редактирования времени
    minutes.disabled = false;
    seconds.disabled = false;
  } else {
    minutes.disabled = true;
    seconds.disabled = true;
  }

})

// Доюавление нулей минутам и секундам
function addZero() {
  if (seconds.value.length < 2) {
    seconds.value = `0${seconds.value}`
  }
  if (minutes.value < 10 && minutes.value.length < 2) {
    minutes.value = `0${minutes.value}`
  }
}

//Запуск таймера
function startTimer() {
	window.timerId = window.setInterval(timer, 1000);
}

//Остановка таймера
function stopTimer() {
  window.clearInterval(window.timerId)
}

//Функция таймера
function timer() {
  substringTime()
  seconds.value = +seconds.value - 1;
  addZero()
  if (+seconds.value <= 0 && +minutes.value !== 0) {
    minutes.value = +minutes.value - 1;
    addZero()
    seconds.value = 60;
    seconds.value = +seconds.value - 1;
  } else if (+seconds.value <= 0 && +minutes.value <= 0) {
    seconds.value = '00';
    minutes.value = '00';
    let audioA = new Audio();
    audioA.src = "audio/final.mp3";
    audioA.autoplay = true;
    window.clearInterval(window.timerId)
  }
}

// Сокращение введенных цифр до 2х в случае ошибочного ввода времени
function substringTime() {
  if (seconds.value.length > 2 || minutes.value.length > 2) {
    seconds.value = seconds.value.substring(0, 2)
    minutes.value = minutes.value.substring(0, 2)
  }
}

