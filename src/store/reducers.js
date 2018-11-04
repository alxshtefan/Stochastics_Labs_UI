import { combineReducers } from 'redux';
import { runner } from '../pages/runner/reducers/runner';
import { integral } from '../pages/integral/reducers/integral';

export const rootReducer = combineReducers({
  runner,
  integral
});
