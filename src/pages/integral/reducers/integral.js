/* eslint-disable no-param-reassign,no-plusplus */

const initialState = {
  geometricMethod: null,
  rectangleMethod: null,
  simpleMethod: null
};

export const integral = (state = initialState, action) => {
  switch (action.type) {

    case 'RESULT':
      return {
        ...state,
        geometricMethod: action.payload.geometricMethod,
        rectangleMethod: action.payload.rectangleMethod,
        simpleMethod: action.payload.simpleMethod
      };

    default:
      return state
  }
};
