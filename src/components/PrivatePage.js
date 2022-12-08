import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Paths } from "../routing/config/paths";

export default function PrivatePage({
  Component,
  roles,
  isPrivate,
  token,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isPrivate) {
          if (token) {
            if (true) {
              return <Component {...props} />;
            }
            return <Redirect to={Paths.main} />;
          }
          return <Redirect to={Paths.signIn} />;
        }
        return !token ? <Component {...props} /> : <Redirect to={Paths.main} />;
      }}
    />
  );
}

// setConfig(roles, ["superadmin"], false).includes(true)
