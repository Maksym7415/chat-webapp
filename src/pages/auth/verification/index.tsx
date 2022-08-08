/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AuthForm from '../common/authForm';
import { actionCheckVerificationCode, actionToken } from '../../../redux/authorization/constants/actionConstants';
// import { VeirficationLocationState } from '../common/authInterfaces'; // interface for history.location.state
import { Paths } from '../../../routing/config/paths';

// hooks
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

export default function ({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const response = useAppSelector(({ authReducer }) => authReducer.verification);
  const isRedirectToSignIn = useAppSelector(({ authReducer }) => authReducer.login.success?.status);
  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  const isSignUp = useAppSelector(({ authReducer }) => authReducer.signUp.success?.email);

  // STATES
  const [error, setError] = useState<string>('');

  // FUNCTIONS
  const submit = (value: any): void => {
    dispatch(actionCheckVerificationCode({ ...value, login: history.location.state.login }));
    error && setError('');
  };

  // USEEFFECTS
  useEffect(() => {
    if (!isRedirectToSignIn && !isSignUp) history.push(Paths.signIn);
  }, []);

  useEffect(() => {
    const errorBack = response.error;
    if (!!response.success.accessToken && !errorBack) {
      localStorage.setItem('accessToken', response.success.accessToken);
      dispatch(actionToken(response.success.accessToken));
      history.push('/', {});
    }
    if (errorBack) {
      const errorBackData = errorBack.response?.data;
      errorBackData?.message && setError(errorBackData?.message);
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
        errorBack={error}
      />
    </>
  );
}
