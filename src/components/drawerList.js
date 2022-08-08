/* eslint-disable no-return-assign */
import React from 'react';
import { useSelector } from 'react-redux';
import Fingerprint2 from 'fingerprintjs2';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Paths } from '../routing/config/paths';
import languages from '../translations';

const drawerList = [
  {
    id: 1,
    title: 'newChat',
    route: Paths.main,
    roles: ['admin', 'user'],
    icon: <GroupIcon />,
    value: 'newChat',
  },
  {
    id: 2,
    title: 'logout',
    route: Paths.signIn,
    roles: ['admin', 'user'],
    icon: <ExitToAppIcon />,
    value: 'logout',
  },
];

export default (handleClickOpen) => {
  const lang = useSelector(({ commonReducer }) => commonReducer.lang);

  const userRoles = ['admin'];
  Fingerprint2.getV18({}, (result, components) => {
    // result is murmur hash fingerprint
    // components is array of {key: 'foo', value: 'component value'}
  });
  let newDrawerList = [];
  drawerList.map((el, index) => el.roles.map((role) => userRoles.map((list) => (role === list ? newDrawerList = [...newDrawerList, {
    ...el,
    title: languages[lang].generals[el.title],
  }] : null))));
  return newDrawerList;
};
