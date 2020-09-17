import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import {
  Container,
  Typography,
  Avatar,
  Button,
  Link,
} from '@material-ui/core';
import { AuthRenderField } from '../common/authRenderField';
import { validate } from './validate';
import useStyles from './style';
import { IPropsForm, IFIeldRenderConfig } from './authInterfaces';
import authFieldRenderConfig from './authConfig';

const ValidationForm: FunctionComponent<InjectedFormProps<{}, IPropsForm, string> & IPropsForm> = ({
  handleSubmit, pageName, icon, formTitle, submitBtnTitle, callBack,
}) => {
  const classes = useStyles();
  const config: IFIeldRenderConfig = authFieldRenderConfig;

  console.log(pageName);
  return (
    <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                {icon}
            </Avatar>
            <Typography component="h1" variant="h5">
                {formTitle}
            </Typography>
            <form className={classes.form} noValidate>
                {config[pageName].map((el, key) => <Field
                        key={key}
                        name={el.fieldName}
                        component={AuthRenderField}
                        placeholder={el.placeHolder}
                        required={el.required}
                        variant='outlined'
                    />)}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit(callBack)}
                >
                    {submitBtnTitle}
                </Button>
            </form>
        </div>
        {pageName === 'signUpPage'
          ? (
              <Link href="/signIn" color="primary">
              Have an account? Sign In.
              </Link>
          )
          : pageName === 'signInPage'
            ? (
                <Link href="/signUp" color="primary">
                  Have no account? Sign Up.
                  </Link>
            )
            : null
        }
    </Container>
  );
};

export default reduxForm<{}, IPropsForm, string>({
  form: 'verificationPageForm',
  validate,
})(ValidationForm);
