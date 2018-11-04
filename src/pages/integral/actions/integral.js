import {
  CHANGE_START_STOP_STATE,
  UPDATE_DONE_TRIES,
  CHANGE_PAUSE_RESUME_STATE,
  FINISH_WORK,
  SAVE_DIMENSIONS,
  SAVE_PROBABILITY,
  SAVE_TRIES,
  SAVE_XY,
  SET_TIMER
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

export const startWork = () => (dispatch, getState) => {
  const totalTries = getState().runner.tries;

  fetch('http://localhost:8080/runner/start/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      totalTries: getState().runner.tries,
      doneTries: 0,
      up: getState().runner.up,
      right: getState().runner.right,
      down: getState().runner.down,
      left: getState().runner.left,
      stop: getState().runner.stop,
      x: getState().runner.x,
      y: getState().runner.y,
      maxX: getState().runner.width,
      maxY: getState().runner.height
    })
  });

  const timerId = setInterval(() => {
    fetch('http://localhost:8080/runner/progress/', { method: 'GET' })
      .then((response) => response.json())
      .then (response => dispatch({type: UPDATE_DONE_TRIES, payload: response}));

    const doneTries = getState().runner.doneTries;
    console.log(doneTries);

    if (doneTries >= totalTries) {
      clearInterval(timerId);
      fetch('http://localhost:8080/runner/finish/', { method: 'GET' })
        .then((response) => response.json())
        .then (response => dispatch({type: FINISH_WORK, payload: response}));
    }
  }, 500);

  dispatch({type: SET_TIMER, payload: timerId})
};

export const stopWork = () => (dispatch, getState) => {
  const timerId = getState().runner.timerId;
  clearInterval(timerId);
  dispatch({type: SET_TIMER, payload: null});
  fetch('http://localhost:8080/runner/finish/', { method: 'GET' })
    .then((response) => response.json())
    .then (response => dispatch({type: FINISH_WORK, payload: response}));
};

export const pauseWork = () => (dispatch, getState) => {
  const timerId = getState().runner.timerId;
  clearInterval(timerId);
  fetch('http://localhost:8080/runner/pause/', { method: 'POST' });
  dispatch({type: SET_TIMER, payload: null});
};

export const resumeWork = () => (dispatch, getState) => {
  fetch('http://localhost:8080/runner/resume/', { method: 'POST' });
  const totalTries = getState().runner.tries;
  const timerId = setInterval(() => {
    fetch('http://localhost:8080/runner/progress/', { method: 'GET' })
      .then((response) => response.json())
      .then (response => dispatch({type: UPDATE_DONE_TRIES, payload: response}));

    const doneTries = getState().runner.doneTries;
    console.log(doneTries);

    if (doneTries >= totalTries) {
      clearInterval(timerId);
      fetch('http://localhost:8080/runner/finish/', { method: 'GET' })
        .then((response) => response.json())
        .then (response => dispatch({type: FINISH_WORK, payload: response}));
    }
  }, 500);

  dispatch({type: SET_TIMER, payload: timerId})
};
