import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionLogin, actionSignUp } from '../../../redux/pages/authorization/constants/actionConstatns';
import { RootState } from '../../../redux/reducer';
import { Login } from './interfaces';
import { Button } from '@material-ui/core';

const Auth = () => {
    const dispatch = useDispatch();

    const loginData: Login = useSelector(({authReducer}: RootState) => authReducer.login);
    console.log(loginData);
    useEffect(() => {
        dispatch(actionLogin({login: 'popovmaksim7415@gmail.com'}));
    }, [dispatch]);

    return (
        <div>
            {loginData.success.status && <p>Sign in success</p>}
        </div>
    )
};

export default Auth;