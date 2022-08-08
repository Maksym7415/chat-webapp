/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RouteComponentProps } from 'react-router-dom';
import AuthForm from '../common/authForm';
import { actionLogin } from '../../../redux/authorization/constants/actionConstants';
import { Paths } from '../../../routing/config/paths';
import languages from '../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

export default function Authorization({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const response = useAppSelector(({ authReducer }) => authReducer.login);

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
        formTitle={languages[lang].authorization.signin}
        submitBtnTitle={languages[lang].authorization.signin}
        pageName={'signInPage'}
        icon={<LockOutlinedIcon />}
        callBack={submit}
        errorBack={error}
      />
    </>
  );
}
