import React from 'react';
import {
  Route, Redirect,
} from 'react-router-dom';
import AppBarWrapper from './appBar/AppBarWrapper';
import setConfig from '../routing/config/setConfig';
import { Paths } from '../routing/config/paths';

export default function PrivatePage({
  Component, roles, isPrivate, token, ...rest
}) {
  return (
            <Route
                {...rest}
                render={(props) => {
                  if (isPrivate) {
                    if (token) {
                      if (setConfig(roles, ['superadmin'], false).includes(true)) {
                        return (
                                <AppBarWrapper {...props}>
                                  <Component {...props}/>
                                </AppBarWrapper>
                        );
                      }
                      return <Redirect to={Paths.main} />;
                    }
                    return <Redirect to={Paths.signIn} />;
                  }
                  return !token ? <Component {...props}/> : <Redirect to='/'/>;
                }}
            />
  );
}
