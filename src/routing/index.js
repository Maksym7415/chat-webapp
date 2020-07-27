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

const setConfiguration = () => {
  const userRoles = ['admin'];
  const config = routerConfig.filter((el) => el.security === true);
  let newConfig = [...config];
  const childs = config[0].childrens.map((el) => el);
  const roles = [];
  Object.keys(newConfig[0].roles).map((el) => newConfig[0].roles[el].map((item) => {
    if (userRoles.includes(item)) return roles.push(el);
  }));
  console.log(roles);
  roles.map((item, i) => {
    if (newConfig[0].childrens.map((el) => el.path !== item.path)) {
      console.log(item);
      newConfig = [{ ...newConfig[0], childrens: newConfig[0].childrens.filter((f) => f.path === item) }];
      return newConfig;
    }
    newConfig = [{ ...newConfig[0], childrens: config[0].childrens }];
    return newConfig;
  });
  return newConfig;
};

function Router(props) {
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const { pathname } = useLocation();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      return setConfig(setConfiguration(config));
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
                 childrens,
                 Component,
                 id,
                 roles,
               }) => Object.keys(roles).includes(pathname) && <Component key={id}>
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
