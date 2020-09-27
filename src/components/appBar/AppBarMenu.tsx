/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar } from '@material-ui/core';
import DefaultAvatar from '../defaultAvatar';
import { UserInfoSuccess } from '../../redux/user/constants/interfaces';

interface IAppBarMenuProps {
  anchorEl: null | Element
  setAnchorEl: (value: null | Element) => void
  mobileMoreAnchorEl: null | Element
  setMobileMoreAnchorEl: (value: null | Element) => void
  userAvatar: string
  userData: UserInfoSuccess
  openProfile: Function
}

export default function ({
  anchorEl, setAnchorEl, mobileMoreAnchorEl, setMobileMoreAnchorEl, userAvatar, userData, openProfile,
}: IAppBarMenuProps) {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileOpen = (event: any) => {
    openProfile();
    handleMobileMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={'primary-search-account-mobile-menu'}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileOpen}
          >
           {userAvatar ? <Avatar alt="" src={`${process.env.REACT_APP_BASE_URL}/${userAvatar}`} /> : <DefaultAvatar name={`${userData.firstName} ${userData.lastName}`} width='40px' height='40px' fontSize='1.1rem' />}
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </>
  );
}
