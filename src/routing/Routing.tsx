import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import routerConfig from "./config/routerConfig";
import PrivatePage from "./components/PrivatePage";
import ContextMenu from "../components/contextMenu";
import ModalCustom from "../components/modal";
import DrawerCustom from "../components/drawer";
import DialogCustom from "../components/dialog/Dialog";
import ErrorPage from "../pages/error";
import Theme from "../config/theme";
import { useAppSelector } from "../hooks/redux";

function Router() {
  // SELECTORS
  const token = useAppSelector(
    ({ authSlice }) => authSlice.headers.accessToken
  );

  return (
    <Fragment>
      <Theme>
        <DrawerCustom />
        <ContextMenu />
        <ModalCustom />
        <DialogCustom />
        <CssBaseline />
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
          <Route component={() => <ErrorPage content="notFound" />} />
        </Switch>
      </Theme>
    </Fragment>
  );
}

export default Router;
