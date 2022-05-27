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
setTimeout(function showTime() {
  const date = new Date().toLocaleTimeString();
  timer.textContent = date;
  showDate();
  greeting.textContent = greetingText;
  setTimeout(showTime, 1000);
}, 1000);

//Приветствие
const greeting = document.querySelector('.greeting');
const hours = new Date().getHours();
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;

function getTimeOfDay() {
  let partOfDay = hours / 6;
  if (partOfDay < 1) return 'night';
  else if (partOfDay >= 1 && partOfDay < 2) return 'morning';
  else if (partOfDay >= 2 && partOfDay < 3) return 'day';
  else return 'evening';
}
