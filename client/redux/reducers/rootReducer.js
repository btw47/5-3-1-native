import { combineReducers } from 'redux';
import { loginReducer } from './userAuthReducer';
import { fetchUserReducer } from './fetchUserReducer';
import { OneRep } from './oneRepReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
  user: fetchUserReducer,
  OneRep
});

export default rootReducer;
