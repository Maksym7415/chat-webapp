import { setLangAction } from "../setting/slice";
import {
  setIsLogoutAction,
  authTokenAction,
  setAuthHedersAction,
} from "./slice";
import { removeTokenLS } from "../../config/localStorage";

export const onLogOut = () => (dispatch) => {
  dispatch(setLangAction("en"));
  dispatch(setIsLogoutAction(true));
  dispatch(authTokenAction(null));
  dispatch(setAuthHedersAction({ accessToken: "" }));
  removeTokenLS();
};
