import {
  CHANGE_START_STOP_STATE,
  CHANGE_PAUSE_RESUME_STATE,
  FINISH_WORK,
  SAVE_DIMENSIONS,
  SAVE_PROBABILITY,
  SAVE_TRIES,
  SAVE_XY,
  SET_TIMER
} from '../constants/ActionTypes';

import { run } from "./calculatingSteps";

export const saveDimensions = ({width, height}) => ({
  type: SAVE_DIMENSIONS,
  payload: { width, height }
});

export const saveXY = ({x, y}) => ({
  type: SAVE_XY,
  payload: { x, y }
});

export const saveTries = (tries) => ({
  type: SAVE_TRIES,
  payload: tries
});

export const saveProbability = ({up, right, down, left, stop}) => ({
  type: SAVE_PROBABILITY,
  payload: { up, right, down, left, stop }
});

export const changeStartStop = (state) => ({
  type: CHANGE_START_STOP_STATE,
  payload: state
});

export const changeResumePause = (state) => ({
  type: CHANGE_PAUSE_RESUME_STATE,
  payload: state
});

export const startWork = () => (dispatch, getState) => {
  const totalTries = getState().runner.tries;

  const timerId = setInterval(() => {
    const doneTries = getState().runner.doneTries;
    if (doneTries >= totalTries) {
      clearInterval(timerId);
      dispatch({ type: FINISH_WORK });
    } else {
      dispatch(run());
    }
  }, 4);

  dispatch({type: SET_TIMER, payload: timerId})
};

export const stopWork = () => (dispatch, getState) => {
  const timerId = getState().runner.timerId;
  clearInterval(timerId);
  dispatch({type: SET_TIMER, payload: null});
  dispatch({ type: FINISH_WORK });
};

export const pauseWork = () => (dispatch, getState) => {
  const timerId = getState().runner.timerId;
  clearInterval(timerId);
  dispatch({type: SET_TIMER, payload: null});
};

