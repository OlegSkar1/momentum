"use strict";
// Дата и время
const timer = document.querySelector(".time");
const currentDay = document.querySelector(".date");

const options = {
  month: "long",
  day: "numeric",
  weekday: "long",
};
function showDate() {
  const currentDate = new Date().toLocaleDateString("ru-RU", options);
  currentDay.textContent = currentDate;
}
setTimeout(function showTime() {
  const date = new Date().toLocaleTimeString();
  timer.textContent = date;
  showDate();
  greeting.textContent = greetingText;
  setTimeout(showTime, 1000);
});

//Приветствие
const greeting = document.querySelector(".greeting");
const hours = new Date().getHours();
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;

function getTimeOfDay() {
  let partOfDay = hours / 6;
  if (partOfDay < 1) return "night";
  else if (partOfDay >= 1 && partOfDay < 2) return "morning";
  else if (partOfDay >= 2 && partOfDay < 3) return "day";
  else return "evening";
}

const userName = document.querySelector(".name");
function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("DOMContentLoaded", getLocalStorage);

//Слайдер
const body = document.querySelector("body");

function getRundomBg(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let bgNum = getRundomBg(1, 20);

function setBg() {
  if (bgNum.toString().length === 1) {
    bgNum = `0${bgNum}`;
  }
  const img = new Image();
  img.src = `../assets/img/${getTimeOfDay()}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(../assets/img/${getTimeOfDay()}/${bgNum}.jpg)`;
    bgNum = Number(bgNum);
  };
}
setBg();

// смена изображения по клику на стрелки
const sliderPrev = document.querySelector(".main__slide_prev");
const sliderNext = document.querySelector(".main__slide_next");

function getSliderPrev() {
  bgNum -= 1;
  if (bgNum < 1) {
    bgNum = 20;
  }
  setBg();
}

function getSliderNext() {
  bgNum += 1;
  if (bgNum > 20) {
    bgNum = 1;
  }
  setBg();
}

sliderPrev.addEventListener("click", getSliderPrev);
sliderNext.addEventListener("click", getSliderNext);

//Погода
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");

async function getWeather() {
  if (city.value) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&APPID=f48cd4ff28ab6b813d969f5684d66467&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
}

window.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("change", getWeather);
