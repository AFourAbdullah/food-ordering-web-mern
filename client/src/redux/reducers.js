// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  userSlice: userReducer,
  cartSlice: cartReducer,
});

export default rootReducer;
