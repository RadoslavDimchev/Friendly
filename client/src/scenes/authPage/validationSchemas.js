import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  firstName: yup.string().min(2, 'must be at least 2 characters long').required('required'),
  lastName: yup.string().min(2, 'must be at least 2 characters long').required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().min(8, 'must be at least 8 characters long').required('required'),
  occupation: yup.string().required('required'),
  linkedin: yup.string().url('not a valid url')
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});
