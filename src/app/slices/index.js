import { combineReducers } from 'redux';
import authReducer from './auth';
import questionReducer from './question';

export const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
});
