import { combineReducers } from 'redux';
import { loginReducer } from './userAuthReducer';
import { fetchUserReducer } from './fetchUserReducer';
import { OneRep } from './oneRepReducer';
import { liftByLift } from './liftByLiftReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
  user: fetchUserReducer,
  OneRep,
  liftByLift
});

export default rootReducer;
