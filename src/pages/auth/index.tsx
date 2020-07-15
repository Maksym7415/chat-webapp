import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionLogin } from '../../redux/pages/authorization/constants/actionConstatns';
import { RootState } from '../../redux/reducer';

const Auth = () => {
    const dispatch = useDispatch();

    const loginData = useSelector(({authReducer}: RootState) => authReducer.login);

    useEffect(() => {
        dispatch(actionLogin('popovmaksim7415@gmail.com'))
    }, [dispatch]);

    return (
        <div>Login</div>
    )
};

export default Auth;