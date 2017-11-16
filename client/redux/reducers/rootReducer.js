import { combineReducers } from 'redux';
import { loginReducer } from './userAuthReducer';
import { fetchUserReducer } from './fetchUserReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
  user: fetchUserReducer
});

export default rootReducer;
