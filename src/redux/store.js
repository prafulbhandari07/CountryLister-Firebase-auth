import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer= combineReducers({auth: authSlice})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)