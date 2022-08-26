"use strict";

const playBtn = document.querySelector(".playBtn");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score");
const place = document.querySelector(".place");

// 플레이 버튼 누를때 활성화
let count = 9;

playBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  if (playBtn.className == "playBtn") {
    playBtn.innerHTML = `
        <i class="fa-solid fa-stop"></i>
    `;

    setTimer();

    setTimeout(() => {
      if (playBtn.className == "playBtn") {
        playBtn.style.visibility = "hidden";
        replayGame("You Lose💩");
      }
    }, 10000);

    score.innerHTML = 10;

    imageCreate();

    playBtn.className = "stopBtn";
  } else {
    playBtn.style.visibility = "hidden";
    replayGame("replay﹖");
  }
}

function setTimer() {
  const bgm = new Audio("sound/bg.mp3");
  bgm.play();
  const stop = setInterval(() => {
    timer.innerHTML = `0:0${count}`;
    count--;
    if (count == -1 || playBtn.style.visibility == "hidden") {
      clearInterval(stop);
      bgm.pause();
    }
  }, 1000);
}

function replayGame(what) {
  const state = document.createElement("div");
  state.setAttribute("class", "state");
  const replayBtn = document.createElement("button");
  replayBtn.setAttribute("class", "replayBtn");
  replayBtn.innerHTML = `
        <i class="fa-solid fa-arrow-rotate-right"></i>
    `;
  const word = document.createElement("span");
  word.innerHTML = `<span>${what}</span>`;
  state.appendChild(replayBtn);
  state.appendChild(word);
  place.appendChild(state);
  replayBtn.addEventListener("click", () => {
    playBtn.className = "playBtn";
    startGame();
    state.style.display = "none";
  });
}

function imageCreate() {
  const carrot = document.createElement("button");
  carrot.innerHTML = `<img src='img/carrot.png'></img>`;
  place.appendChild(carrot);

  carrot.addEventListener("click", () => {
    carrot.style.display = "none";
    const catchingCarrot = new Audio("sound/carrot_pull.mp3");
    catchingCarrot.play();
    score.innerHTML = 9;
  });
}
