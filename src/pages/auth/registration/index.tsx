/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RouteComponentProps } from 'react-router-dom';
import { actionSignUp } from '../../../redux/authorization/constants/actionConstants';
import AuthForm from '../common/authForm';
import { RootState } from '../../../redux/reducer';
import { Paths } from '../../../routing/config/paths';

export default function ({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const { success: { email: login }, error: errorBack } = useSelector(({ authReducer }: RootState) => authReducer.signUp);

  // STATES
  const [error, setError] = useState<string>('');

  // FUNCTIONS
  const submit = (value: any): void => {
    dispatch(actionSignUp(value));
    error && setError('');
  };

  // USEEFFECTS
  useEffect(() => {
    if (login && !errorBack) history.push(Paths.verification, { login });
    if (errorBack) {
      const errorBackData = errorBack.response?.data;
      errorBackData?.message && setError(errorBackData?.message);
    }
  }, [errorBack, login]);

  return (
    <>
      <AuthForm
        formTitle={'Sign up'}
        submitBtnTitle={'Sign up'}
        pageName={'signUpPage'}
        icon={<LockOutlinedIcon />}
        callBack={submit}
        errorBack={error}
      />
    </>
  );
}
