"use strict";

import * as sound from "./sound.js";
import { field, ItemType } from "./field.js";

export const Reason = Object.freeze({
  win: "win",
  cancel: "ancel",
  lose: "lose",
});

export class GameBuilder {
  withGameCount(count) {
    this.gameCount = count;
    return this;
  }

  withCarrotCount(num) {
    this.carroCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    console.log(this);
    return new Game(this.gameCount, this.carroCount, this.bugCount);
  }
}

export class Game {
  constructor(count, carroCount, bugCount) {
    this.count = count;
    this.carroCount = carroCount;
    this.bugCount = bugCount;

    this.timer = document.querySelector(".timer");
    this.score = document.querySelector(".score");
    this.playBtn = document.querySelector(".playBtn");
    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.started = false;
    this.gameScore = 0;
    this.time = undefined;

    this.gameField = new field(this.carroCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showScoreAndTimer();
    this.startTimer();
    sound.playBackground();
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  stop(reason) {
    this.started = false;
    this.disappearButton();
    this.stopTimer();
    sound.stopBackgrond();
    this.onGameStop && this.onGameStop(reason);
  }

  showStopButton() {
    const icon = this.playBtn.querySelector(".fa-solid");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.playBtn.style.visibility = "visible";
  }

  disappearButton() {
    this.playBtn.style.visibility = "hidden";
  }

  showScoreAndTimer() {
    this.timer.style.visibility = "visible";
    this.score.style.visibility = "visible";
  }

  startTimer() {
    let remainingTime = this.count;
    this.updateTimeText(remainingTime);
    this.time = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(this.time);
        this.stop(Reason.lose);
        return;
      }
      this.updateTimeText(--remainingTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.time);
  }

  updateTimeText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timer.innerText = `${minutes}:${seconds}`;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.gameScore++;
      this.changeScore();
      if (this.carroCount === this.gameScore) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  initGame() {
    this.gameScore = 0;
    this.score.innerHTML = this.carroCount;
    this.gameField.init();
  }

  changeScore() {
    this.score.innerText = this.carroCount - this.gameScore;
  }
}
