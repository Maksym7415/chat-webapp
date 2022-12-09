import { setLangAction } from "../reduxToolkit/setting/slice";
import {
  setIsLogoutAction,
  authTokenAction,
  setAuthHeadersAction,
} from "../reduxToolkit/auth/slice";
import { removeTokenLS } from "../config/localStorage";

export const actionLogOut = () => (dispatch) => {
  dispatch(setLangAction("en"));
  dispatch(setIsLogoutAction(true));
  dispatch(authTokenAction(null));
  dispatch(setAuthHeadersAction({ accessToken: "" }));
  removeTokenLS();
};
