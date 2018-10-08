import { INCREMENT_WORK } from "../constants/ActionTypes";
import { addDown, addLeft, addRight, addUp, addStop } from "../localeStorage/localeStorage";

export const run = () => (dispatch, getState) => {
  let stillRunning = true;

  const goUp = getState().runner.up;
  const goRight = getState().runner.right;
  const goDown = getState().runner.down;
  const goLeft = getState().runner.left;
  const stop = getState().runner.stop;

  let x = getState().runner.x;
  let y = getState().runner.y;

  const maxX = getState().runner.width;
  const maxY = getState().runner.height;

  while (stillRunning) {
    const newStep = Math.floor((Math.random() * 100) + 1);

    if (stop.includes(newStep)) {
      addStop();
      stillRunning = false;
    }

    if (goUp.includes(newStep)) {
      addUp();
      y += 1;
    }
    if (goRight.includes(newStep)) {
      addRight();
      x += 1;
    }
    if (goDown.includes(newStep)) {
      addDown();
      y -= 1;
    }
    if (goLeft.includes(newStep)) {
      addLeft();
      x -= 1;
    }

    if (Number(x) > Number(maxX) || Number(x) <= 0) {
      stillRunning = false;
    }

    if (Number(y) > Number(maxY) || Number(y) <= 0) {
      stillRunning = false;
    }
  }

  dispatch({ type: INCREMENT_WORK })
};
