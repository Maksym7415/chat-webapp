/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { Fragment, useEffect, useState } from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../theme';
import Preloader from '../components/preloader/Preloader';
import setAxios, { LocalStorageService } from '../axios.config';
import routerConfig from './config/routerConfig';
import PrivatePage from '../components/PrivatePage';
import ContextMenu from '../components/contextMenu';
import DialogComponent from '../components/dialog/DialogComponent';
import { userInfoActionRequest } from '../redux/user/constants/actions';

function Router() {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);

  // STATES
  const [config, setConfig] = useState(null);

  // USEEFFECTS
  useEffect(() => {
    setAxios();
  }, []);

  useEffect(() => {
    if (authToken?.userId) dispatch(userInfoActionRequest());
    setConfig((item) => routerConfig);
  }, [authToken]);

  return (
    <Fragment>
      <Theme>
        <Preloader />
        <DialogComponent />
        <ContextMenu />
        <CssBaseline />
        <div>
        {
          config
            && (
              <Switch>{
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
                          token={LocalStorageService.getAccessToken()}
                        />)
                  }
                  <Route component = {() => <div>404</div>} />
              </Switch>
            )
          }
        </div>
      </Theme>
    </Fragment>
  );
}

export default Router;
