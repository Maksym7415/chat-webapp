
export default {
    signInPage: [
        {
            fieldName: 'login',
            placeHolder: 'email@example.com',
            required: true
        }
    ],
    signUpPage: [
        {
            fieldName: 'firstName',
            placeHolder: 'John',
            required: true
        },
        {
            fieldName: 'lastName',
            placeHolder: 'Doe',
            required: false
            
        },
        {
            fieldName: 'login',
            placeHolder: 'email@example.com',
            required: true
        },
    ],
    verificationPage: [
        {
            fieldName: 'verificationCode',
            placeHolder: '00000',
            required: true
        }
    ],
}