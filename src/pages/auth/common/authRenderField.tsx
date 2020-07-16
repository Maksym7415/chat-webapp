import React from 'react';
import {
    TextField,
} from '@material-ui/core';

interface Meta{
    touched: boolean,
    error: string,
    invalid: boolean
}

interface RenderField{
    input: (e: React.ChangeEvent<HTMLInputElement>) => void,
    meta: Meta,
    label: string,
    type: string,
    placeholder: string,
    value: string,
    variant: 'outlined'
}

export const AuthRenderField = ({input, meta: {touched, error, invalid  }, label, placeholder, variant} : RenderField) => 
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
