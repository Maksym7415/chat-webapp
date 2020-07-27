import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AuthForm from '../common/authForm';
import { actionCheckVerificationCode, actionToken } from '../../../redux/pages/authorization/constants/actionConstatns';
import { IPropsPages } from '../common/authInterfaces';
import { RootState } from '../../../redux/reducer';

interface Responce {
  success: {
    accessToken: string
  },
  error: null | object
}

export default function ({ history: { push, location: { state } } }: IPropsPages) {
  const dispatch = useDispatch();
  const responce: Responce = useSelector(({ authReducer }: RootState) => authReducer.verification);

  const submit = (value: any): void => {
    dispatch(actionCheckVerificationCode({ ...value, login: 'popovmaksim7415@gmail.com' }));
  };

  useEffect(() => {
    if (responce.success.accessToken && !responce.error) {
      localStorage.setItem('accessToken', responce.success.accessToken);
      dispatch(actionToken(responce.success.accessToken));
      push('/', {});
    }
  }, [responce]);

  return (
        <>
            <AuthForm
                formTitle={'Verificate your account'}
                submitBtnTitle={'Verificate'}
                pageName={'verificationPage'}
                icon={<VerifiedUserIcon />}
                callBack={submit}
            />
        </>
  );
}
