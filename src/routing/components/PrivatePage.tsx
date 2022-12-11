import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Paths } from "../config/paths";

interface IProps {
  id: number;
  Component: any;
  isPrivate: boolean;
  path: string;
  token: string;
  exact: boolean;
}

const PrivatePage = ({ Component, isPrivate, token, ...rest }: IProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isPrivate) {
          if (token) {
            return <Component {...props} />;
          }
          return <Redirect to={Paths.signIn} />;
        }
        return !token ? <Component {...props} /> : <Redirect to={Paths.main} />;
      }}
    />
  );
};

export default PrivatePage;
