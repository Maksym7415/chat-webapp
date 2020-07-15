import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionLogin } from '../../redux/pages/authorization/constants/actionConstatns';
import { RootState } from '../../redux/reducer';
import { Login } from './interfaces';

const Auth = () => {
    const dispatch = useDispatch();

    const loginData: Login = useSelector(({authReducer}: RootState) => authReducer.login);

    useEffect(() => {
        dispatch(actionLogin('popovmaksim7415@gmail.com'))
    }, [dispatch]);

    return (
    <div>loginData</div>
    )
};

export default Auth;