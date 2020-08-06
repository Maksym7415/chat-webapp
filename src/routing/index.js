/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment, useEffect, useState } from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';

import setAxios from '../axios.config';
import routerConfig from './config/routerConfig';
import PrivatePage from '../components/PrivatePage';

function Router(props) {
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig((item) => routerConfig);
  }, [authToken, isLogout]);

  useEffect(() => {
    setAxios();
  }, []);

  return (
    <Fragment>
      <Theme>
        <CssBaseline />
        {
          config
            && (
              <Switch>
                {
                  config.map(({
                    id, Component, roles, isPrivate, path,
                  }) => <PrivatePage
                          id={id}
                          Component={Component}
                          roles={roles}
                          isPrivate={isPrivate}
                          path={path}
                          exact
                          key={id}
                          token={localStorage.accessToken}
                        />)
                  }
                  <Route component = {() => <div>404</div>} />
              </Switch>
            )
          }
      </Theme>
    </Fragment>
  );
}

export default Router;
