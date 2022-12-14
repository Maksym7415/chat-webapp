import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { setAuthHeadersAction, authTokenAction } from "./auth/slice";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (localStorage.accessToken) {
  store.dispatch(
    setAuthHeadersAction({ accessToken: localStorage.accessToken })
  );
  store.dispatch(authTokenAction({ token: localStorage.accessToken }));
}

export default store;
