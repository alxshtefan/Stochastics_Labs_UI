import { INCREMENT_WORK } from "../constants/ActionTypes";
import { addDown, addLeft, addRight, addUp, addStop } from "../localeStorage/localeStorage";
import { addXLeft, addYLeft, addXRight, addYRight } from "../localeStorage/localeStorageForCharts";

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

    if (Number(x) > Number(maxX)) {
      stillRunning = false;
      addYRight(y, maxY);
    }
    if (Number(x) <= 0) {
      stillRunning = false;
      addYLeft(y, maxY);
    }

    if (Number(y) > Number(maxY)) {
      stillRunning = false;
      addXRight(x, maxX);
    }
    if (Number(y) <= 0) {
      stillRunning = false;
      addXLeft(x, maxX);
    }
  }

  dispatch({ type: INCREMENT_WORK })
};
