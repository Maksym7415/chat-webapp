import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  options: {
    message: "",
    open: false,
    severity: "",
    timeout: 0,
    // wrapperStyle: {},
    // style: {},
    // styleText: {},
    action: null,
    templateType: null,
  },
};

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    getSnackBar(state, { payload }) {
      state.options = payload;
    },
  },
});

export const { getSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
