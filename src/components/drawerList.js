/* eslint-disable no-return-assign */
import React from 'react';
import Fingerprint2 from 'fingerprintjs2';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Paths } from '../routing/config/paths';

const drawerList = [
  {
    id: 1,
    title: 'New Chat',
    route: Paths.main,
    roles: ['admin', 'user'],
    icon: <GroupIcon />,
  },
  {
    id: 2,
    title: 'Logout',
    route: Paths.signIn,
    roles: ['admin', 'user'],
    icon: <ExitToAppIcon />,
  },
];

export default (handleClickOpen) => {
  const userRoles = ['admin'];
  Fingerprint2.getV18({}, (result, components) => {
    // result is murmur hash fingerprint
    // components is array of {key: 'foo', value: 'component value'}
  });
  let newDrawerList = [];
  drawerList.map((el, index) => el.roles.map((role) => userRoles.map((list) => (role === list ? newDrawerList = [...newDrawerList, el] : null))));
  return newDrawerList;
};
