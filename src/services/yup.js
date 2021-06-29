const yup = require('yup')

const validate = (obj, schema) => {
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
    const value = error.errors[0]
    result[key] = value
  })

  return { errors: result }
}

const signUpSchema = yup.object().shape({
  name: yup.string().required().min(8).max(255),
  email: yup.string().email().max(255),
  password: yup.string().min(8).max(255),
  termsAccepted: yup.boolean().required(),
  newsletterSubscribed: yup.boolean(),
})

const signInSchema = yup.object().shape({
  email: yup.string().email().max(255),
  password: yup.string().min(8).max(255),
})

module.exports = { mapErrors, validate, signUpSchema, signInSchema }
