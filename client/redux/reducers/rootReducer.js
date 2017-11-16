import { combineReducers } from 'redux';
import { loginReducer } from './userAuthReducer';

const rootReducer = combineReducers({ auth: loginReducer });

export default rootReducer;
