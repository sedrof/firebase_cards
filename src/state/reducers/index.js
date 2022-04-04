import { combineReducers } from 'redux';
import auth from './auth';
import cards from './cards';

const reducers = combineReducers({
    cards,
    auth
});

export default reducers