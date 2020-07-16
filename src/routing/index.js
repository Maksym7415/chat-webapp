import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';
import SignInPage from '../pages/auth/authorization/signIn';
import SignUpPage from '../pages/auth/registration';
import VerificationPage from '../pages/auth/verification/verification' 

function Router(props) {

  return (
    <Fragment>
      <Theme>
        <CssBaseline />
          <Switch>
            <Route component = {SignInPage} exact path = '/signin'/>
            <Route component = {SignUpPage} exact path = '/signup'/>
            <Route component = {VerificationPage} exact path = '/verification'/>
          </Switch>
      </Theme>
    </Fragment>
  );
}


export default Router;
