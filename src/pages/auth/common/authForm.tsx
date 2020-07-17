import React, { FunctionComponent } from 'react';
import { useParams } from "react-router";
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { AuthRenderField } from '../common/authRenderField';
import { validate } from '../common/validate'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Avatar,
    Button
} from '@material-ui/core';

import { IPropsForm } from './authInterfaces'

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



const ValidationForm: FunctionComponent<InjectedFormProps<{}, IPropsForm, string> & IPropsForm> = 
    ({ handleSubmit, config, pageName, icon, formTitle,submitBtnTitle, callBack }) => {

    const classes = useStyles();

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
                    {config[pageName].map((el, key) => 
                        <Field
                            key={key}
                            name={el.fieldName}
                            component={AuthRenderField}
                            placeholder={el.placeHolder}
                            required={el.required}
                            variant='outlined'
                        />
                    )}
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
        </Container>
    )
}

export default reduxForm<{}, IPropsForm, string>({
    form: 'verificationPageForm',
    validate
})(ValidationForm);