import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { routersConfig } from "./config/routerConfig";
import PrivatePage from "./components/PrivatePage";
import ContextMenu from "../components/contextMenu";
import ModalCustom from "../components/modal";
import DrawerCustom from "../components/drawer";
import SnackBarCustom from "../components/snackbar";
import DialogCustom from "../components/dialog/Dialog";
import ErrorPage from "../pages/error";
import Theme from "../config/theme";
import { useAppSelector } from "../hooks/redux";
import { eContentErrorPage } from "../ts/enums/app";

const Routing = () => {
  // SELECTORS
  const token = useAppSelector(
    ({ authSlice }) => authSlice.headers.accessToken
  );

  return (
    <Fragment>
      <Theme>
        <SnackBarCustom />
        <DrawerCustom />
        <ContextMenu />
        <ModalCustom />
        <DialogCustom />
        <CssBaseline />
        <Switch>
          {routersConfig.map(({ id, Component, isPrivate, path }) => (
            <PrivatePage
              id={id}
              Component={Component}
              isPrivate={isPrivate}
              path={path}
              key={id}
              token={token}
              exact
            />
          ))}
          <Route
            component={() => <ErrorPage content={eContentErrorPage.notFound} />}
          />
        </Switch>
      </Theme>
    </Fragment>
  );
};

export default Routing;
