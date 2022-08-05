/* eslint-disable @typescript-eslint/ban-types */
import { FormSubmitHandler } from 'redux-form';

interface IFields {
  fieldName: string
  placeHolder: string
  required: boolean
}

interface Meta {
  touched: boolean,
  error: string,
  invalid: boolean
}

export interface VeirficationLocationState {
  login: string
}

export interface IPropsRenderField {
  input: (e: React.ChangeEvent<HTMLInputElement>) => void,
  meta: Meta,
  label: string,
  type: string,
  placeholder: string,
  value: string,
  variant: 'outlined'
  required: boolean
}

export interface IPropsForm {
  pageName: string
  icon: object
  formTitle: string
  submitBtnTitle: string
  callBack: (e: any) => void
  errorBack?: string,
}

export interface IFIeldRenderConfig {
  [key: string]: IFields[]
}
