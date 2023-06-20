import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk'

const reducers = combineReducers({
  user: userReducer,
  cart: cartReducer  
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;
