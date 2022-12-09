/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../theme";
import routerConfig from "./config/routerConfig";
import PrivatePage from "../components/PrivatePage";
import ContextMenu from "../components/contextMenu";
import Modal from "../components/modal";
import DialogComponent from "../components/dialog/DialogComponent";
import DrawerCustom from "../components/drawer/";

function Router() {
  // SELECTORS
  const token = useSelector(({ authSlice }) => authSlice.headers.accessToken);

  console.log(token, "token");
  return (
    <Fragment>
      <Theme>
        <DrawerCustom />
        <ContextMenu />
        <Modal />
        {/* <DialogComponent /> */}
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
          <Route component={() => <div>404</div>} />
        </Switch>
      </Theme>
    </Fragment>
  );
}

export default Router;
