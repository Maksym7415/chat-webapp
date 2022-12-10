import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Paths } from "../config/paths";

// need ts

const PrivatePage = ({ Component, roles, isPrivate, token, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isPrivate) {
          if (token) {
            if (true) {
              return <Component {...props} />;
            }
            // return <Redirect to={Paths.main} />;
          }
          return <Redirect to={Paths.signIn} />;
        }
        return !token ? <Component {...props} /> : <Redirect to={Paths.main} />;
      }}
    />
  );
};

export default PrivatePage;

// setConfig(roles, ["superadmin"], false).includes(true)
