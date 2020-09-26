import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../../redux/reducer';
import AuthForm from '../common/authForm';
import { actionLogin } from '../../../redux/authorization/constants/actionConstants';

export default function ({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState<string>('');
  const response = useSelector(({ authReducer }: RootState) => authReducer.login);

  const submit = (value: any): void => {
    setLogin(value);
    dispatch(actionLogin(value));
  };

  useEffect(() => {
    if (response.success.status && !response.error) history.push('/verification', login);
  }, [response]);
  console.log(process.env.NODE_ENV);

  return (
    <>
      <AuthForm
        formTitle={'Sign in'}
        submitBtnTitle={'Sign in'}
        pageName={'signInPage'}
        icon={<LockOutlinedIcon />}
        callBack={submit}
      />
    </>
  );
}
