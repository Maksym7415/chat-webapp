import React, { FunctionComponent } from 'react';
import { useParams } from "react-router";
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRenderField } from '../common/authRenderField';
import { actionCheckVerificationCode } from '../../../redux/pages/authorization/constants/actionConstatns'
import { validate } from '../common/validate'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Avatar,
    Button
} from '@material-ui/core';

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


interface IProps {
    message: string
}

const ValidationForm: FunctionComponent<InjectedFormProps<{}, IProps, string> & IProps> = ({ handleSubmit, message }) => {
    console.log(useParams(), message)
    const dispatch = useDispatch();
    const classes = useStyles();

    const submit = (value: any): void => {
        dispatch(actionCheckVerificationCode({ ...value }))
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verificate your account
                </Typography>
                <form className={classes.form} noValidate>
                    <Field
                        name="verificationCode"
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
                        verificate
          </Button>
                </form>
            </div>
        </Container>
    )
}

export default reduxForm<{}, IProps, string>({
    form: 'verificationPageForm',
    validate
})(ValidationForm);







// import React, {FunctionComponent } from 'react';
// import { useParams } from "react-router";
// import { reduxForm, Field, InjectedFormProps } from 'redux-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { AuthRenderField } from '../common/authRenderField';
// import { actionCheckVerificationCode } from '../../../redux/pages/authorization/constants/actionConstatns'
// import { validate } from '../common/validate'
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//     Container,
//     Typography,
//     Avatar,
//     Button
// } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.primary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

// interface IProps{
//     message: string
// }

// class VelidationForm extends React.Component<InjectedFormProps<{}, IProps> & IProps>{
//     console.log(useParams())
//     const dispatch = useDispatch();
//     const classes = useStyles();

//     const submit = (value: any): void => {
//         dispatch(actionCheckVerificationCode({ ...value }))
//     };

//     return (
//         <Container component="main" maxWidth="xs">
//             <div className={classes.paper}>
//                 <Avatar className={classes.avatar}>
//                     <VerifiedUserIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Verificate your account
//                 </Typography>
//                 <form className={classes.form} noValidate>
//                     <Field
//                         name="verificationCode"
//                         component={AuthRenderField}
//                         placeholder="email@example.com"
//                         variant='outlined'
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                         onClick={handleSubmit(submit)}
//                     >
//                         verificate
//           </Button>
//                 </form>
//             </div>
//         </Container>
//     )
// }

// export default reduxForm<{}, IProps>({
//     form: 'verificationPageForm',
//     validate
// })(VelidationForm);
