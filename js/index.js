"use strict";
import playList from "./playList.js";
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

//Цитаты
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
Object.prototype.mixArr = function () {
  return this.map((i) => [Math.random(), i])
    .sort()
    .map((i) => i[1])[0];
};

async function getQuotes() {
  const quotes = "data.json";
  const response = await fetch(quotes);
  const data = await response.json();

  const rundomQuote = data.mixArr();
  quote.textContent = rundomQuote.quote;
  author.textContent = rundomQuote.author;
}
getQuotes();

changeQuote.addEventListener("click", getQuotes);

// Аудиоплеер
const ul = document.querySelector(".header__player__playlist");
playList.forEach((i) => {
  const li = document.createElement("li");
  li.classList.add("header__player__playlist__play-item");
  li.textContent = i.title;
  ul.append(li);
});

const player = document.querySelector(".header__player");
const playButton = document.querySelector(".header__player__controls_play");
const prevButton = document.querySelector(".header__player__controls_prev");
const nextButton = document.querySelector(".header__player__controls_next");
const playItems = document.querySelectorAll(
  ".header__player__playlist__play-item"
);
const mainAudio = document.querySelector("#main-audio");
const progressBar = document.querySelector(".header__progressiveBar");
const progressArea = document.querySelector(".header__progressiveArea");

let playNum = 0;

window.addEventListener("load", () => {
  loadMusic(playNum);
});

function loadMusic() {
  playItems[playNum].classList.add("play-item-active");
  mainAudio.src = playList[playNum].src;
  mainAudio.currentTime = 0;
}

function playMusic() {
  playButton.classList.add("header__player__controls_pause");
  player.classList.add("paused");
  playItems[playNum].classList.add("play-item-active");
  mainAudio.play();
}

function pauseMusic() {
  playButton.classList.remove("header__player__controls_pause");
  player.classList.remove("paused");
  mainAudio.pause();
}

function playPrev() {
  playNum -= 1;
  if (playNum < 0) {
    playNum = playList.length - 1;
    playItems[0].classList.remove("play-item-active");
    playItems[playNum].classList.add("play-item-active");
  } else {
    playItems[playNum].classList.add("play-item-active");
    playItems[playNum + 1].classList.remove("play-item-active");
  }
  loadMusic();
  playMusic();
}

function playNext() {
  playNum += 1;
  if (playNum >= playList.length) {
    playNum = 0;
    playItems[playList.length - 1].classList.remove("play-item-active");
    playItems[playNum].classList.add("play-item-active");
  } else {
    playItems[playNum].classList.add("play-item-active");
    playItems[playNum - 1].classList.remove("play-item-active");
  }
  loadMusic();
  playMusic();
}

playButton.addEventListener("click", () => {
  const isMusicPaused = player.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});
prevButton.addEventListener("click", playPrev);
nextButton.addEventListener("click", playNext);
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = player.querySelector(".current");
  const musicDuration = player.querySelector(".duration");

  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    musicDuration.textContent = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;
  musicCurrentTime.textContent = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});

mainAudio.addEventListener("ended", playNext);
