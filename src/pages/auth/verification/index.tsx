import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AuthForm from '../common/authForm';
import { actionCheckVerificationCode, actionToken } from '../../../redux/authorization/constants/actionConstants';

import { IPropsPages } from '../common/authInterfaces';
import { RootState } from '../../../redux/reducer';

interface Response {
  success: {
    accessToken: string
  },
  error: null | object
}

export default function ({ history: { push, location: { state } } }: IPropsPages) {
  const dispatch = useDispatch();
  const response: Response = useSelector(({ authReducer }: RootState) => authReducer.verification);

  const submit = (value: any): void => {
    dispatch(actionCheckVerificationCode({ ...value, login: 'popovmaksim7415@gmail.com' }));
  };

  useEffect(() => {
    if (response.success.accessToken && !response.error) {
      localStorage.setItem('accessToken', response.success.accessToken);
      dispatch(actionToken(response.success.accessToken));
      push('/', {});
    }
  }, [response]);

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
