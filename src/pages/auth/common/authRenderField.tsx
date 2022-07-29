import React from 'react';
import {
  TextField,
} from '@material-ui/core';
import { IPropsRenderField } from './authInterfaces';
import useStyles from './style';

export const AuthRenderField = ({
  input, meta: { touched, error, invalid }, label, placeholder, variant,
}: IPropsRenderField) => {
  // HOOKS
  const classes = useStyles();

  return (
        <TextField
            className={classes.textField}
            label={label}
            placeholder={placeholder}
            error={touched && invalid}
            helperText={touched && error}
            required
            variant={variant}
            {...input}
            fullWidth
        />
  );
};
