import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actionSignUp } from '../../../redux/pages/authorization/constants/actionConstatns'
import reduxFormConfig from '../common/authConfig';
import AuthForm from '../common/authForm'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RootState } from '../../../redux/reducer';
import { IPropsPages } from '../common/authInterfaces'

export default function ({history: { push }}: IPropsPages) {
  const dispatch = useDispatch();
  const {success: {email: login}, error} = useSelector(({authReducer}: RootState) => authReducer.signUp)
  console.log(error)
  const submit = (value: any): void => {
      dispatch(actionSignUp(value))
  };

  useEffect(() => {
    if(login && !error) push('/verification', {login})
  }, [error, login])

  return (
      <>
          <AuthForm
              formTitle={'Sign up'}
              submitBtnTitle={'Sign up'}
              config={reduxFormConfig} 
              pageName={'signUpPage'} 
              icon={<LockOutlinedIcon/>}
              callBack={submit}
          />
      </>
  )
}
  