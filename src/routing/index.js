/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment, useEffect, useState } from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';

import setAxios from '../axios.config';
import routerConfig from './config/routerConfig';
import setRouterConfig from './config/setConfig';

function Router(props) {
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const { pathname } = useLocation();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (localStorage.accessToken) {
      return setConfig(setRouterConfig(routerConfig)[0]);
    }
    setConfig((item) => routerConfig.filter((el) => el.security === false)[0]);
  }, [authToken, isLogout]);

  useEffect(() => {
    setAxios();
  }, []);

  return (
    <Fragment>
      <Theme>
        <CssBaseline />
          {config && <Switch>
            {config.childrenPath.includes(pathname)
              && <config.Wrapper>
                  {config.children.map(({
                    path, component, id,
                  }) => (pathname === '/' && !localStorage.accessToken ? <Redirect to='/signIn'/> : <Route path = {path} exact component = {component} key={id}/>))}
                </config.Wrapper>
            }
            <Route component = {() => <div>404</div>} />
          </Switch>}
      </Theme>
    </Fragment>
  );
}

export default Router;
