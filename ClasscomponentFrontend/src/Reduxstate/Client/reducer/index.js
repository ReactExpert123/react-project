import { combineReducers } from 'redux';

import home from './home_reducer'

// Using combineReducer if in future I'll need to add more reducers to the project

const rootReducer = combineReducers({
    home
});

export default rootReducer;
