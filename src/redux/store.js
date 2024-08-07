import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "./slices/cartslice";
import userSlice from "./slices/userslice"


const persistConfig = {
  key: "root",
  storage,
};


const rootReducer = combineReducers({
  cart: cartSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);