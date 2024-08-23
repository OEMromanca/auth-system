import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export const useFormValidation = (formType: 'login' | 'register') => {
  const commonSchema = {
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  }

  const schemas = {
    login: yup.object(commonSchema),
    register: yup.object({
      ...commonSchema,
      userName: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password')
    })
  }

  const schema = schemas[formType]

  const { handleSubmit, setFieldError, resetForm } = useForm({
    validationSchema: schema
  })

  const { value: email, errorMessage: emailError } = useField('email')
  const { value: password, errorMessage: passwordError } = useField('password')
  const { value: userName, errorMessage: userNameError } = useField('userName')
  const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword')

  return {
    email,
    password,
    userName,
    confirmPassword,
    emailError,
    passwordError,
    userNameError,
    confirmPasswordError,
    handleSubmit,
    setFieldError,
    resetForm
  }
}
