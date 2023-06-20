import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userSlice', 'cartSlice'],
};

export default persistConfig;
