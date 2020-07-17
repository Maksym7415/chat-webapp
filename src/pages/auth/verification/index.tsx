import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxFormConfig from '../common/authConfig';
import AuthForm from '../common/authForm'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { actionCheckVerificationCode } from '../../../redux/pages/authorization/constants/actionConstatns'
import { IPropsPages } from '../common/authInterfaces';
import { RootState } from '../../../redux/reducer'

interface Responce{
    success: {
        accessToken: string
    },
    error: null | object
}

export default function ({history: {push, location: { state } }}: IPropsPages) {
    const dispatch = useDispatch();
    const responce: Responce = useSelector(({authReducer}:RootState)  => authReducer.verification)

    const submit = (value: any): void => {
        dispatch(actionCheckVerificationCode({ ...value, login: state.login }))
    };

    useEffect(() => {
        if(responce.success.accessToken && !responce.error) push('/', {})
    }, [responce])

    return (
        <>
            <AuthForm
                formTitle={'Verificate your account'}
                submitBtnTitle={'Verificate'}
                config={reduxFormConfig} 
                pageName={'verificationPage'} 
                icon={<VerifiedUserIcon/>}
                callBack={submit}
            />
        </>
    )
}