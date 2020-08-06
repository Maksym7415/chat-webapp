import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Fingerprint2 from 'fingerprintjs2';

const drawerList = [
  {
    id: 1,
    title: 'Inbox',
    route: '/profile',
    roles: ['admin'],
    icon: <InboxIcon />,
  },
  {
    id: 2,
    title: 'Send email',
    route: '/',
    roles: ['admin', 'user'],
    icon: <MailIcon />,
  },
];

export default () => {
  const userRoles = ['admin'];
  Fingerprint2.getV18({}, (result, components) => {
    // result is murmur hash fingerprint
    console.log(result, components);
    // components is array of {key: 'foo', value: 'component value'}
  });
  let newDrawerList = [];
  drawerList.map((el, index) => el.roles.map((role) => userRoles.map((list) => (role === list ? newDrawerList = [...newDrawerList, el] : null))));
  return newDrawerList;
};
