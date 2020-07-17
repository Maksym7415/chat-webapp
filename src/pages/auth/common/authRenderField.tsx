import React from 'react';
import {
    TextField,
} from '@material-ui/core';
import { IPropsRenderField } from './authInterfaces'

export const AuthRenderField = ({input, meta: {touched, error, invalid  }, label, placeholder, variant} : IPropsRenderField) => 
     ( 
        <TextField
            label={label}
            placeholder={placeholder}
            error={touched && invalid}
            helperText={touched && error}
            required
            variant={variant}
            {...input}
            fullWidth
        />
    )
