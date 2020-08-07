import { combineReducers } from 'redux';
import user from './user_reducer';
import customer from './customer_reducer';
import review from './reviews_reducer';
import pup from './pup_reducer'
import dash from './dash_reducer'

// Using combineReducer if in future I'll need to add more reducers to the project

const rootReducer = combineReducers({
    user,pup,review,customer,dash
});

export default rootReducer;
