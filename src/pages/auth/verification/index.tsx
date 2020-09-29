import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AuthForm from '../common/authForm';
import { actionCheckVerificationCode, actionToken } from '../../../redux/authorization/constants/actionConstants';
import { VeirficationLocationState } from '../common/authInterfaces'; // interface for history.location.state
import { RootState } from '../../../redux/reducer';

export default function ({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const response = useSelector(({ authReducer }: RootState) => authReducer.verification);
  const isRedirectToSignIn = useSelector(({ authReducer }: RootState) => authReducer.login.success?.status);
  const isSignUp = useSelector(({ authReducer }: RootState) => authReducer.signUp.success?.email); // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page

  const submit = (value: any): void => {
    dispatch(actionCheckVerificationCode({ ...value, login: history.location.state.login }));
  };

  useEffect(() => {
    if (!isRedirectToSignIn && !isSignUp) history.push('/signIn');
  }, []);

  useEffect(() => {
    if (response.success.accessToken && !response.error) {
      localStorage.setItem('accessToken', response.success.accessToken);
      dispatch(actionToken(response.success.accessToken));
      history.push('/', {});
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
