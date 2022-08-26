"use strict";

import popUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new popUp();
const game = new GameBuilder()
  .withGameCount(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay？";
      sound.playAlert();
      break;
    case Reason.win:
      message = "You Win✌️";
      sound.playWin();
      break;
    case Reason.lose:
      message = "You Lose💩";
      sound.playBug();
      break;
      dafault: throw new Error("not valid reason");
  }
  gameFinishBanner.appear(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
