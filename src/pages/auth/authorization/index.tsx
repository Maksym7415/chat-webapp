/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../redux/reducer';
import AuthForm from '../common/authForm';
import { actionLogin } from '../../../redux/authorization/constants/actionConstants';
import { Paths } from '../../../routing/config/paths';

export default function ({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const response = useSelector(({ authReducer }: RootState) => authReducer.login);

  // STATES
  const [login, setLogin] = useState<string>('');
  const [error, setError] = useState<string>('');

  // FUNCTIONS
  const submit = (value: any): void => {
    setLogin(value);
    dispatch(actionLogin(value));
    error && setError('');
  };

  // USEEFFECTS
  useEffect(() => {
    const errorBack = response.error;
    if (response.success?.status && !errorBack) history.push(Paths.verification, login);
    if (errorBack) {
      const errorBackData = errorBack.response?.data;
      errorBackData?.message && setError(errorBackData?.message);
    }
  }, [response]);

  return (
    <>
      <AuthForm
        formTitle={'Sign in'}
        submitBtnTitle={'Sign in'}
        pageName={'signInPage'}
        icon={<LockOutlinedIcon />}
        callBack={submit}
        errorBack={error}
      />
    </>
  );
}
