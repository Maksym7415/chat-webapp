import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Fingerprint2 from 'fingerprintjs2';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerList = [
  {
    id: 1,
    title: 'New Chat',
    route: '/',
    roles: ['admin', 'user'],
    icon: <GroupIcon />,
  },
  {
    id: 2,
    title: 'Send email',
    route: '/',
    roles: ['admin', 'user'],
    icon: <MailIcon />,
  },
  {
    id: 3,
    title: 'Logout',
    route: '/',
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
