/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AuthForm from '../common/authForm';
import { actionCheckVerificationCode, actionToken } from '../../../redux/authorization/constants/actionConstants';
import { VeirficationLocationState } from '../common/authInterfaces'; // interface for history.location.state
import { RootState } from '../../../redux/reducer';
import { Paths } from '../../../routing/config/paths';

export default function ({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const response = useSelector(({ authReducer }: RootState) => authReducer.verification);
  const isRedirectToSignIn = useSelector(({ authReducer }: RootState) => authReducer.login.success?.status);
  const isLogout = useSelector(({ authReducer }: RootState) => authReducer.logout.isLogout);

  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  const isSignUp = useSelector(({ authReducer }: RootState) => authReducer.signUp.success?.email);

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
