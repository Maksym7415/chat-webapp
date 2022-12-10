import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import settingSlice from "./setting/slice";
import conversationsSlice from "./conversations/slice";
import userSlice from "./user/slice";
import searchSlice from "./search/slice";
import contactsSlice from "./contacts/slice";

export default combineReducers({
  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
  userSlice,
  searchSlice,
  contactsSlice,
});
