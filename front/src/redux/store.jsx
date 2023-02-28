import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice.jsx";

const rootReducer = combineReducers({
  authUser: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
