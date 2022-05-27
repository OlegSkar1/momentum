'use strict';
// Дата и время
const timer = document.querySelector('.time');
const currentDay = document.querySelector('.date');

const options = {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
function showDate() {
  const currentDate = new Date().toLocaleDateString('ru-RU', options);
  currentDay.textContent = currentDate;
}
function showTime() {
  const date = new Date().toLocaleTimeString();
  timer.textContent = date;
  showDate();
  setTimeout(showTime, 1000);
}
setTimeout(showTime, 1000);
