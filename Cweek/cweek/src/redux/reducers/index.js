import { combineReducers } from 'redux';
import inventoryReducer from './inventoryReducer';

const rootReducer = combineReducers({
  inventory: inventoryReducer
});

export default rootReducer;