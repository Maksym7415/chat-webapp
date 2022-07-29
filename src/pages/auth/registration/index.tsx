import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RouteComponentProps } from 'react-router';
import { actionSignUp } from '../../../redux/authorization/constants/actionConstants';
import AuthForm from '../common/authForm';
import { RootState } from '../../../redux/reducer';
import { Paths } from '../../../routing/config/paths';

export default function ({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const { success: { email: login }, error } = useSelector(({ authReducer }: RootState) => authReducer.signUp);

  // FUNCTIONS
  const submit = (value: any): void => {
    dispatch(actionSignUp(value));
  };

  // USEEFFECTS
  useEffect(() => {
    if (login && !error) history.push(Paths.verification, { login });
  }, [error, login]);

  return (
    <>
      <AuthForm
        formTitle={'Sign up'}
        submitBtnTitle={'Sign up'}
        pageName={'signUpPage'}
        icon={<LockOutlinedIcon />}
        callBack={submit}
      />
    </>
  );
}
