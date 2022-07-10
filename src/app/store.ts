import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import {AuthState} from "../reducers/Auth/AuthReducer";
import {AuthDBState} from "../reducers/AuthDB/AuthDBReducer";
import logger from "redux-logger";

type loadFromLocalStorageType = () => AuthState | undefined;

const saveIdToLocalStorage = (state: AuthDBState) => {
  localStorage.setItem("userId", JSON.stringify(state));
};

const loadIdToLocalStorage = () => {
  const serialisedState = localStorage.getItem("userId");
  if (serialisedState === null) {
    return undefined;
  }
  return JSON.parse(serialisedState);
};

const saveToLocalStorage = (state: AuthState) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("user", serialisedState);
  } catch (err) {
    console.warn(err);
  }
};

const loadFromLocalStorage: loadFromLocalStorageType = () => {
  try {
    const serialisedState = localStorage.getItem("user");
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

const preloadedState = {
  reducer: {
    AuthReducer: loadFromLocalStorage(),
    AuthDBReducer: loadIdToLocalStorage(),
  },
};
export const store = configureStore({
  reducer: {
    reducer,
  },
  preloadedState,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().reducer.AuthReducer);
});
store.subscribe(() => {
  saveIdToLocalStorage(store.getState().reducer.AuthDBReducer);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
