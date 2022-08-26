"use strict";

import * as sound from "./sound.js";

const itemSize = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.place = document.querySelector(".place");
    this.Rect = this.place.getBoundingClientRect();
    this.place.addEventListener("click", this.onClick);
  }

  init() {
    this.place.innerHTML = "";
    this._createItem(ItemType.carrot, this.carrotCount, "img/carrot.png");
    this._createItem(ItemType.bug, this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _createItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.Rect.width - itemSize;
    const y2 = this.Rect.height - itemSize;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.place.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
