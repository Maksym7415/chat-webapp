
interface DynamicError {
  [key: string]: string
}

interface DynamicValue {
  [key: string]: string
}


export const validate = (values: DynamicValue) => {
  const errors: DynamicError = {}
  console.log(values)
  const requiredFields = [
    'login',
    'verificationCode'
  ]
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.login &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)
  ) {
    errors.login = 'Invalid email address'
  }
  return errors
}