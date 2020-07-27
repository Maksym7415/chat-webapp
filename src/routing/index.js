import React, { Fragment, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';
import SignInPage from '../pages/auth/authorization/login';
import SignUpPage from '../pages/auth/registration';
import VerificationPage from '../pages/auth/verification';
import AppBarWrapper from '../components/appBar/AppBarWrapper';
import MainScreen from '../pages/mainScreen';

import routerConfig from './config/routerConfig';

function Router() {
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const [config, setConfig] = React.useState([]);

  React.useEffect(() => {
    console.log(localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken')) {
      return setConfig((item) => routerConfig.filter((el) => el.security === true));
    }
    setConfig((item) => routerConfig.filter((el) => el.security === false));
  }, [authToken, isLogout]);

  return (
    <Fragment>
      <Theme>
        <CssBaseline />
          <Switch>
        {console.log({ config, isLogout })}

            {
              config.map((route) => {
                if (!route.security) {
                  return (
                    <Route path = {route.path} exact component = {route.component} key={route.id}/>
                  );
                }
                return (
                    <Route path = {route.path} exact component = {route.component} />
                );
              })
            }
            <Route component = {() => <div>404</div>} />
            {/* <Route component = {SignInPage} exact path = '/signin'/>
            <Route component = {SignUpPage} exact path = '/signup'/>
            <Route component = {VerificationPage} exact path = '/verification'/>
            <AppBarWrapper>
              <Route component = {MainScreen} exact path = '/'/>
            </AppBarWrapper> */}
          </Switch>
      </Theme>
    </Fragment>
  );
}

export default Router;
