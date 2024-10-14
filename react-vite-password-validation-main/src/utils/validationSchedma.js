import * as yup from 'yup';

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[-+_!@#$%^&*.,?]).{8,}$/;

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email must not be empty'),
  age: yup
    .string()
    .matches(/^[0-9]+$/, 'Age must be a number')
    .required('Age must not be empty'),
  new_password: yup
    .string()
    .min(8, 'Password requirements not met')
    .matches(passwordRules, {
      message: 'Password requirements not met',
    })
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm Password required'),
});
