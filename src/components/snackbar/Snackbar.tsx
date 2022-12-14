import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { getSnackBar, initialState } from "./slice";
import TemplatesContent from "./components/templatesContent";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const SnackbarComponent = () => {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const options = useAppSelector(({ snackBarSlice }) => snackBarSlice.options);

  // FUNCTIONS
  const onDismissSnackBar = () => dispatch(getSnackBar(initialState.options));

  // VARIABLES
  const message = options.message;

  return (
    <Snackbar
      // wrapperStyle={options.wrapperStyle}
      // style={options.style}
      open={options.open}
      onClose={onDismissSnackBar}
      autoHideDuration={options.timeout}
      action={options.action}
      message="qwer"
    />
  );
};

export default SnackbarComponent;

{
  /* {message ? (
        <p style={options.styleText}>{message}</p>
      ) : (
        options.templateType && <TemplatesContent type={options.templateType} />
      )} */
}
