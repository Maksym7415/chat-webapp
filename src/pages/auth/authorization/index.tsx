import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RootState } from '../../../redux/reducer';
import AuthForm from '../common/authForm';
import { actionLogin } from '../../../redux/authorization/constants/actionConstants';
import { IPropsPages } from '../common/authInterfaces';
import { State } from './interfaces';

export default function ({ history: { push } }: IPropsPages) {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({ login: '' });
  const response = useSelector(({ authReducer }: RootState) => authReducer.login);

  const submit = (value: any): void => {
    setState(value);
    dispatch(actionLogin(value));
  };

  useEffect(() => {
    if (response.success.status && !response.error) push('/verification', state);
  }, [response]);

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
