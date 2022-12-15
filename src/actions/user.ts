import { setLangAction } from "../reduxToolkit/setting/slice";
import {
  authTokenAction,
  setAuthHeadersAction,
} from "../reduxToolkit/auth/slice";
import { removeTokenLS } from "../config/localStorage";

export const actionLogOut = () => (dispatch) => {
  dispatch(setLangAction("en"));
  dispatch(authTokenAction(null));
  dispatch(setAuthHeadersAction({ accessToken: "" }));
  removeTokenLS();
};
