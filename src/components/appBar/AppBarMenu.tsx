import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { actionLogout } from '../../redux/authorization/constants/actionConstants';
import DefaultAvatar from '../defaultAvatar';

interface IAppBarMenuProps {
  anchorEl: null | Element
  setAnchorEl: (value: null | Element) => void
  mobileMoreAnchorEl: null | Element
  setMobileMoreAnchorEl: (value: null | Element) => void
  userAvatar: string
  firstName: string
  lastName: string
  openProfile: Function
}

export default function ({
  anchorEl, setAnchorEl, mobileMoreAnchorEl, setMobileMoreAnchorEl, userAvatar, firstName, lastName, openProfile,
}: IAppBarMenuProps) {
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();

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
           {!userAvatar ? <Avatar alt="" src={`http://localhost:8081/${userAvatar}`} /> : <DefaultAvatar name={`${firstName} ${lastName}`} width='40px' height='40px' fontSize='1.1rem' />}
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </>
  );
}
