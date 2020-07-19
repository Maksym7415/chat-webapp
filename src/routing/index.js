import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';
import SignInPage from '../pages/auth/authorization/login';
import SignUpPage from '../pages/auth/registration';
import VerificationPage from '../pages/auth/verification';
import AppBarWrapper from '../components/appBar/AppBarWrapper';
import MainScreen from '../pages/mainScreen';

function Router() {
  return (
    <Fragment>
      <Theme>
        <CssBaseline />
          <Switch>
            <Route component = {SignInPage} exact path = '/signin'/>
            <Route component = {SignUpPage} exact path = '/signup'/>
            <Route component = {VerificationPage} exact path = '/verification'/>
            <AppBarWrapper>
              <Route component = {MainScreen} exact path = '/'/>
            </AppBarWrapper>
          </Switch>
      </Theme>
    </Fragment>
  );
}

export default Router;
