import {
  CHANGE_START_STOP_STATE,
  CHANGE_PAUSE_RESUME_STATE,
  SAVE_DIMENSIONS,
  SAVE_PROBABILITY,
  SAVE_TRIES,
  SAVE_XY, INCREMENT_WORK
} from '../constants/ActionTypes';

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

export const startWork = () => ({
  type: INCREMENT_WORK
});
