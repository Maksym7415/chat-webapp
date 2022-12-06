import { setLangAction } from "../setting";
import { setIsLogoutAction } from "../auth";

export const onLogOut = () => async (dispatch) => {
  dispatch(setLangAction("en"));
  dispatch(setIsLogoutAction());
};
