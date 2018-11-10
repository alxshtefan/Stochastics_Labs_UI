/* eslint-disable no-param-reassign,no-plusplus */

import { SET_FETCH, RESULT } from "../constants/ActionTypes";

const initialState = {
  isFetching: false,
  analyticalMethod: null,
  geometricMethod: null,
  rectangleMethod: null,
  simpleMethod: null
};

export const integral = (state = initialState, action) => {
  switch (action.type) {

    case RESULT:
      return {
        ...state,
        analyticalMethod: action.payload.analyticalMethod.toFixed(4),
        geometricMethod: action.payload.geometricMethod.toFixed(4),
        rectangleMethod: action.payload.rectangleMethod.toFixed(4),
        simpleMethod: action.payload.simpleMethod.toFixed(4),
        isFetching: false
      };

    case SET_FETCH:
      return{
        ...state,
        isFetching: action.payload,
      };

    default:
      return state
  }
};
