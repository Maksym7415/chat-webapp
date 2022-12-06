import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./app";
import authSlice from "./auth";
import settingSlice from "./setting";
import conversationsSlice from "./conversations/slice";
import userSlice from "./user";
// import snackBarSlice from '../components/snackbar/slice';
import searchSlice from "./search";
import contactsSlice from "./contacts";

export default combineReducers({
  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
  userSlice,
  searchSlice,
  contactsSlice,
});
