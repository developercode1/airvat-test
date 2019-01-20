import { combineReducers } from 'redux';
import userReducer from './UserReducer';

const reducers = combineReducers({
  userReducer,
})

export default reducers;