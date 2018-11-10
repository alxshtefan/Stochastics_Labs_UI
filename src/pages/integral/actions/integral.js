import {RESULT, SET_FETCH} from "../constants/ActionTypes";

export const countIntegrals = ({A, B, C, k, m, N}) => (dispatch) => {
  dispatch({type: SET_FETCH, payload: true});
  fetch('http://localhost:8080/integral/calculate/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      a: A,
      b: B,
      c: C,
      k,
      m,
      n: N
    })
  })
    .then(response => response.json())
    .then(response => dispatch({type: RESULT, payload: response}));
};
