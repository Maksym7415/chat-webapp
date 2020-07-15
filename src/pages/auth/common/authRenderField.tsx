import React from 'react';

interface Meta{
    touched: string,
    error: string
}

interface RenderField{
    input: (e: React.ChangeEvent<HTMLInputElement>) => void,
    meta: Meta,
    label: string,
    type: string,
    placeholder: string,
    value: string
}

export const authRenderField = ({input, meta: {touched, error}, label, type, placeholder, value } : RenderField) => (  
    <div>
        <label htmlFor="origin">
            {label}
            {<input type = {type} placeholder = {placeholder} {...input} value={value}  /> }
        </label> 
    </div>
);