import React from 'react';
import { reduxForm, Field, InjectedFormProps  } from 'redux-form';
import {
  Container,
  Typography,
  Avatar,
  Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AuthRenderField } from '../common/authRenderField';
import { actionLogin } from '../../../redux/pages/authorization/constants/actionConstatns'
import { validate } from '../common/validate'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignInPage = ({handleSubmit}: InjectedFormProps) => {
 
    const dispatch = useDispatch();
    const classes = useStyles()
    const submit = (value: any) : any => {
        dispatch(actionLogin(value))
      };

    return (
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Field
            name="login"
            component={AuthRenderField}
            placeholder="email@example.com"
            variant='outlined'
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(submit)}
          >
            Sign In
          </Button>
        </form>
      </div>  
    </Container>      
    )
}

export default reduxForm({
    form: 'signInForm',
    validate
  })(SignInPage);
  