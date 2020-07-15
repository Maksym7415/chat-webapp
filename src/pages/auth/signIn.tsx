import React from 'react';
import { reduxForm, Field, InjectedFormProps  } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { authRenderField } from './common/authRenderField';
import {actionLogin} from '../../redux/pages/authorization/constants/actionConstatns'

interface StateProps {
    values: any;
  }
  interface Props extends StateProps {
    loading: boolean
}

const SignInPage: React.StatelessComponent<Props & InjectedFormProps<{}, Props>> =
  ({handleSubmit, loading, values}) => {
    console.log(values && values.login)
    const dispatch = useDispatch();
    const submit = (value: any) : any => {
        console.log(value)
        dispatch(actionLogin(value))
      };

    return (
        <div>
            <div>
                <form >
                    <Field
                        name="login"
                        component={authRenderField}
                        type="email"
                        placeholder="email@example.com"
                        value={values && values.login}
                    />
                    <div>
                        <button onClick={handleSubmit(submit)}>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const SignInF = reduxForm<{}, Props>({
    form: 'signInForm',
  })(SignInPage);
  
  export default connect(
    (state: RootState) : StateProps => ({
      values: state.formReducer.signInForm,
    }),
    { load: actionLogin } 
  )(SignInF);

