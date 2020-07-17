import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import AuthForm from '../../common/authForm';
import { actionLogin } from '../../../../redux/pages/authorization/constants/actionConstatns';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { IPropsPages } from '../../common/authInterfaces';

interface State {
    login: string
}

interface Responce {
    success: {
        status: boolean
    },
    error: null | object
}

export default function ({ history: { push } }: IPropsPages) {
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({ login: '' })
    const responce: Responce = useSelector(({ authReducer }: RootState) => authReducer.login)

    const submit = (value: any): void => {
        setState(value)
        dispatch(actionLogin(value))
    };

    useEffect(() => {
        if (responce.success.status && !responce.error) push('/verification', state);
    }, [responce])

    return (
        <>
            <AuthForm
                formTitle={'Sign in'}
                submitBtnTitle={'Sign in'}
                pageName={'signInPage'}
                icon={<LockOutlinedIcon />}
                callBack={submit}
            />
        </>
    )
}
