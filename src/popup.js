"use strict";

export default class popUp {
  constructor() {
    this.popUp = document.querySelector(".popUp");
    this.popUpText = document.querySelector(".message");
    this.popUpReplay = document.querySelector(".replayBtn");
    this.popUpReplay.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add("popUp_hide");
  }

  appear(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove("popUp_hide");
  }
}
