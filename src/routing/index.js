/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment, useEffect, useState } from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';
import routerConfig from './config/routerConfig';

const renderRoutesByUserRoles = (path, component, id, componentRoles, userRoles) => {
  if (componentRoles.map((el) => userRoles.includes(el)).includes(true)) return <Route path = {path} exact component = {component} key={id}/>;
  return <Redirect to='/'/>;
};

function Router(props) {
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const { pathname } = useLocation();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      return setConfig((item) => routerConfig.filter((el) => el.security === true));
    }
    setConfig((item) => routerConfig.filter((el) => el.security === false));
  }, [authToken, isLogout]);
  const arr = [];
  return (
    <Fragment>
      <Theme>
        <CssBaseline />
        {console.log(config)}
          {config && <Switch>
            {
               config.map(({
                 component,
                 security,
                 childrens,
                 Component,
                 path,
                 id,
                 roles,
               }) => {
                 if (!security) {
                   return (
                    <Route path = {path} exact component = {component} key={id} security={security}/>
                   );
                 }
                 return (
                   Object.keys(roles).includes(pathname) && <Component key={id}>
                     {childrens.map(({
                       path, component, id,
                     }) => renderRoutesByUserRoles(path, component, id, roles[pathname], ['admin']))}
                   </Component>
                 );
               })
            }
            <Route component = {() => <div>404</div>} />
          </Switch>}
      </Theme>
    </Fragment>
  );
}

export default Router;
