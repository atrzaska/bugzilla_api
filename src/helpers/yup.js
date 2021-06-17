const yup = require('yup')

const validate = (schema, obj) => {
  try {
    schema.validateSync(obj, { abortEarly: false })
    return []
  } catch (error) {
    return error.inner
  }
}

const mapErrors = (errors) => {
  const result = {}

  errors.forEach((error) => {
    const key = error.path
    const value = error.errors
    result[key] = value
  })

  return { errors: result }
}

const signUpSchema = yup.object().shape({
  name: yup.string().required().min(8),
  email: yup.string().email(),
  password: yup.string().min(8),
  termsAccepted: yup.boolean().required(),
  newsletterSubscribed: yup.boolean(),
})

const signInSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(8),
})

module.exports = { mapErrors, validate, signUpSchema, signInSchema }
