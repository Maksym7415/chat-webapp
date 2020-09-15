import React, { useState, useEffect, FunctionComponent } from 'react';
import { TextField, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/index';
import { userInfoActionRequest } from '../../../redux/user/actions/actions';
import * as interfaces from '../../../redux/user/actions/interfaces';

const UserProfile: FunctionComponent = () => {
  const dispatch = useDispatch();

  const userId = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload.userId);
  const userInfo = useSelector(({ userReducer }: RootState) => userReducer.userInfo.success);
  const [userData, setUserData] = useState<any>({});
  const [inputValue, setInputValue] = useState<any>({});

  const convertToInput = (id: string, value: string) => {
    console.log(value);
    setInputValue((prev: any) => ({ ...prev, [id]: { value: value || 'Добавьте', isInput: true } }));
  };

  useEffect(() => {
    dispatch(userInfoActionRequest(userId));
  }, [userId]);

  useEffect(() => {
    console.log(userInfo);
    setUserData(() => {
      const {
        id, login, status, userCreationTime, userUpdateTime, userLastTimeOnline, Roles, ...inputs
      } = userInfo.data;
      return inputs;
    });
  }, [userInfo]);

  return (
    // userInfo && userInfo.data && <div>{userInfo.data.fullName}</div>
    <Grid item xs={6} style={{ margin: '20px' }}>
        {userInfo && userInfo.data && Object.keys(userData).map((item) => (
          <div style={{
            display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', marginBottom: '10px',
          }}>
            {`${item}:`} {inputValue[item] && inputValue[item].isInput === true ? <TextField id="standard-basic" size='small' name = {userData[item]} value={inputValue[item].value} /> : <div onClick = {() => convertToInput(item, userData[item])}>{userData[item] || 'Добавьте'}</div>}
          </div>
        ))}
    </Grid>
  );
};

export default UserProfile;
