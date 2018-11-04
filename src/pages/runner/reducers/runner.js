/* eslint-disable no-param-reassign,no-plusplus */
import {
  CHANGE_START_STOP_STATE,
  CHANGE_PAUSE_RESUME_STATE,
  INCREMENT_WORK,
  FINISH_WORK,
  SAVE_DIMENSIONS,
  SAVE_PROBABILITY,
  SAVE_TRIES,
  SAVE_XY,
  SET_TIMER, UPDATE_DONE_TRIES
} from '../constants/ActionTypes';
import {
  DIMENSIONS,
  XY,
  PROBABILITY,
  TRIES
} from '../constants/settingsSteps';
import { START, PAUSE } from '../constants/workStates';

const initialState = {
  timerId: null,
  workFinished: false,
  doneTries: 0,
  down: null,
  height: null,
  left: null,
  right: null,
  result: null,
  settingsError: '',
  settingsStep: DIMENSIONS,
  startStopText: START,
  pauseResumeText: PAUSE,
  stop: null,
  tries: null,
  up: null,
  width: null,
  x: null,
  y: null
};

export const runner = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DIMENSIONS: {
      let height = action.payload.height;
      let width = action.payload.width;
      let settingsError = '';
      let settingsStep = XY;
      const regex = new RegExp('^\\d+$');

      if (!regex.test(height) || !regex.test(width)) {
        height = null;
        width = null;
        settingsError = 'Must be only integers.';
        settingsStep = DIMENSIONS;
      }

      return {
        ...state,
        height,
        settingsError,
        settingsStep,
        width
      };
    }

    case SAVE_XY: {
      let x = action.payload.x;
      let y = action.payload.y;
      let settingsError = '';
      let settingsStep = PROBABILITY;
      const regex = new RegExp('^\\d+$');

      if (!regex.test(x) || !regex.test(y)) {
        x = null;
        y = null;
        settingsError = 'Must be only integers.';
        settingsStep = XY;
      } else if (Number(x) > Number(state.width) || Number(y) > Number(state.height)) {
        x = null;
        y = null;
        settingsError = 'x must be less then width and y must be less then height.';
        settingsStep = XY;
      }

      return {
        ...state,
        x,
        settingsError,
        settingsStep,
        y
      };
    }

    case SAVE_PROBABILITY: {
      let up = action.payload.up;
      let right = action.payload.right;
      let down = action.payload.down;
      let left = action.payload.left;
      let stop = action.payload.stop;
      let settingsError = '';
      let settingsStep = TRIES;
      const regex = new RegExp('^\\d+$');

      if (!regex.test(up) || !regex.test(right) || !regex.test(down) || !regex.test(left) || !regex.test(stop)) {
        up = null;
        right = null;
        down = null;
        left = null;
        stop = null;
        settingsError = 'Must be only integers.';
        settingsStep = PROBABILITY;
      }

      if (up && down && stop) {
        const sum = Number(up) + Number(right) + Number(down) + Number(left) + Number(stop);

        if (sum !== 100) {
          up = null;
          right = null;
          down = null;
          left = null;
          stop = null;
          settingsError = 'Sum of all you percents must be 100!';
          settingsStep = PROBABILITY;
        }
      }

      if (up && down && stop) {
        let start = 1;
        let end = Number(up);

        up = [];
        // eslint-disable-next-line no-plusplus
        for (start; start <= end; start++) {
          up.push(start);
        }

        end += Number(right);
        right = [];
        // eslint-disable-next-line no-plusplus
        for (start; start <= end; start++) {
          right.push(start);
        }

        end += Number(down);
        down = [];
        // eslint-disable-next-line no-plusplus
        for (start; start <= end; start++) {
          down.push(start);
        }

        end += Number(left);
        left = [];
        // eslint-disable-next-line no-plusplus
        for (start; start <= end; start++) {
          left.push(start);
        }

        end += Number(stop);
        stop = [];
        // eslint-disable-next-line no-plusplus
        for (start; start <= end; start++) {
          stop.push(start);
        }
      }

      return {
        ...state,
        up,
        right,
        down,
        left,
        stop,
        settingsError,
        settingsStep
      };
    }

    case SAVE_TRIES: {
      let tries = action.payload;
      let settingsError = '';
      let settingsStep = null;
      const regex = new RegExp('^\\d+$');

      if (!regex.test(tries)) {
        tries = null;
        settingsError = 'Must be only integers.';
        settingsStep = TRIES;
      }

      return {
        ...state,
        tries,
        settingsError,
        settingsStep
      };
    }

    case CHANGE_START_STOP_STATE: {
      return {
        ...state,
        startStopText: action.payload
      }
    }

    case CHANGE_PAUSE_RESUME_STATE: {
      return {
        ...state,
        pauseResumeText: action.payload
      }
    }

    case SET_TIMER:
      return {
        ...state,
        timerId: action.payload
      };

    case FINISH_WORK:
      return {
        ...state,
        workFinished: true,
        result: action.payload
      };

    case INCREMENT_WORK: {
      const doneTries = state.doneTries + 1;
      return {
        ...state,
        doneTries
      };
    }

    case UPDATE_DONE_TRIES:
      return {
        ...state,
        doneTries: action.payload.progress
      };

    default:
      return state
  }
};
