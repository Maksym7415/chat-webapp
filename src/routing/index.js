import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';
import Auth from '../pages/auth';

function Router(props) {

  return (
    <Fragment>
      <Theme>
        <CssBaseline />
          <Switch>
            <Route component = {Auth} exact path = '/'/>
          </Switch>
      </Theme>
    </Fragment>
  );
}


export default Router;
