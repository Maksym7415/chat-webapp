/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment, useEffect, useState } from 'react';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';

import setAxios from '../axios.config';
import routerConfig from './config/routerConfig';

const setRouteConfiguration = () => {
  const userRoles = ['admin'];
  const config = routerConfig.filter((el) => el.security === true);
  let newConfig = [...config];
  let childrens = [];
  let childrenPath = [];
  newConfig[0].childrens.map((route) => route.roles.map((userRole) => {
    if (userRoles.includes(userRole)) {
      childrens = [...childrens, route];
      childrenPath = [...childrenPath, route.path];
    }
  }));

  return [{ ...newConfig[0], childrens, childrenPath }];
};

function Router(props) {
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const { pathname } = useLocation();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      return setConfig(setRouteConfiguration());
    }
    setConfig((item) => routerConfig.filter((el) => el.security === false));
  }, [authToken, isLogout]);

  useEffect(() => {
    setAxios();
  }, []);

  return (
    <Fragment>
      <Theme>
        <CssBaseline />
          {config && <Switch>
            {
               config.map(({
                 childrenPath,
                 childrens,
                 Component,
                 id,
               }) => childrenPath.includes(pathname)
                && <Component key={id}>
                     {childrens.map(({
                       path, component, id,
                     }) => <Route path = {path} exact component = {component} key={id}/>)}
                   </Component>)
            }
            <Route component = {() => <div>404</div>} />
          </Switch>}
      </Theme>
    </Fragment>
  );
}

export default Router;
