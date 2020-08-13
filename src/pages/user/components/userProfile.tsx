import React, { useState, useEffect, FunctionComponent } from 'react';
import { } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/index';
import { userInfoActionRequest } from '../../../redux/user/actions/actions';
import * as interfaces from '../../../redux/user/actions/interfaces';

const UserProfile: FunctionComponent = () => {
  const dispatch = useDispatch();

  const userId = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload.userId);
  const userInfo = useSelector(({userReducer}: RootState) => userReducer.userInfo.success);

  useEffect(() => {
    dispatch(userInfoActionRequest(userId));
  }, [userId]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    // userInfo && userInfo.data && <div>{userInfo.data.fullName}</div>
    <div>
        {userInfo && userInfo.data && Object.keys(userInfo.data).map(item => (
            <div>{`${item}: ${userInfo.data[item as interfaces.UserInfoSuccessKeyType]}`}</div>
        ))}
    </div>
  );
};

export default UserProfile;