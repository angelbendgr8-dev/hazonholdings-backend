import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";

import { setupListeners } from "@reduxjs/toolkit/query";

import userAuth from "./reducers/auth.reducer";
import { UserAuthApi } from "./services/auth.service";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["preferences"],
};

const reducers = combineReducers({
  userAuth,
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "userauth/signOut") {
    // this applies to all keys defined in persistConfig(s)
    // store.removeItem('persist:root');

    state = {};
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () =>
  configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat([UserAuthApi.middleware]),
  });
export const store = createStore();
export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
