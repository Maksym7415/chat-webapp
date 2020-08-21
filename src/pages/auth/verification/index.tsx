import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AuthForm from '../common/authForm';
import { actionCheckVerificationCode, actionToken } from '../../../redux/authorization/constants/actionConstants';
import { VeirficationLocationState } from '../common/authInterfaces'; // interface for history.location.state
import { RootState } from '../../../redux/reducer';

export default function ({ history }: RouteComponentProps) {
  console.log(history);
  const dispatch = useDispatch();
  const response = useSelector(({ authReducer }: RootState) => authReducer.verification);

  const submit = (value: any): void => {
<<<<<<< HEAD
    dispatch(actionCheckVerificationCode({ ...value, login: history.location.state.login }));
=======
    dispatch(actionCheckVerificationCode({ ...value, login: 'vit91112@gmail.com' }));
>>>>>>> 5509cdb4e5e9fba5d238511346c7ed176f1ffe5f
  };

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
