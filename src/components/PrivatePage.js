import React from 'react';
import {
  Route, Redirect,
} from 'react-router-dom';
import AppBarWrapper from './appBar/AppBarWrapper';
import setConfig from '../routing/config/setConfig';
import { SocketOnwrapper } from '../socket';

function PrivatePage({
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
                          <SocketOnwrapper>
                            <AppBarWrapper {...props}>
                              <Component {...props}/>
                            </AppBarWrapper>
                          </SocketOnwrapper>
                        );
                      }
                      return <Redirect to='/'/>;
                    }
                    return <Redirect to='/signIn'/>;
                  }
                  return !token ? <Component {...props}/> : <Redirect to='/'/>;
                }}
            />
  );
}

export default PrivatePage;
