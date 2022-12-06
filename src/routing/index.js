/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../theme";
import routerConfig from "./config/routerConfig";
import PrivatePage from "../components/PrivatePage";
import ContextMenu from "../components/contextMenu";
import DialogComponent from "../components/dialog/DialogComponent";
import {
  authTokenAction,
  setAuthHedersAction,
} from "../reduxToolkit/auth/slice";
import { getUserProfileDataRequest } from "../reduxToolkit/user/requests";
import DrawerCustom from "../components/drawer/";

function Router() {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const authToken = useSelector(({ authSlice }) => authSlice.tokenPayload);
  const token = useSelector(({ authSlice }) => authSlice.headers.accessToken);

  // STATES
  const [isLoading, setIsLoading] = React.useState(true);

  // FUNCTIONS
  const checkIsToken = async () => {
    setIsLoading(true);
    try {
      if (token) {
        await dispatch(
          setAuthHedersAction({
            accessToken: token,
          })
        );
        await dispatch(
          authTokenAction({
            token,
          })
        );
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // USEEFFECTS
  React.useLayoutEffect(() => {
    checkIsToken();
  }, []);

  React.useLayoutEffect(() => {
    if (authToken.userId) {
      dispatch(getUserProfileDataRequest());
    }
  }, [authToken]);

  return (
    <Fragment>
      <Theme>
        <DrawerCustom />
        <ContextMenu />
        {/* <DialogComponent />
        <CssBaseline /> */}
        <Switch>
          {routerConfig.map(({ id, Component, roles, isPrivate, path }) => (
            <PrivatePage
              id={id}
              Component={Component}
              roles={roles}
              isPrivate={isPrivate}
              path={path}
              exact
              key={id}
              token={token}
            />
          ))}
          <Route component={() => <div>404</div>} />
        </Switch>
      </Theme>
    </Fragment>
  );
}

export default Router;
