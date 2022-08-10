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
import { setLanguageAction } from '../redux/common/commonActions';

function Router() {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
  const isLogout = useSelector(({ authReducer }) => authReducer.logout.isLogout);
  const userInfo = useSelector(({ userReducer }) => userReducer.userInfo.success);
  const lang = useSelector(({ commonReducer }) => commonReducer.lang);

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

  useEffect(() => {
    const langUser = userInfo?.data?.lang;
    if (langUser) {
      lang !== langUser && dispatch(setLanguageAction(langUser));
    }
  }, [userInfo]);

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
                          token={isLogout ? null : LocalStorageService.getAccessToken()}
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
