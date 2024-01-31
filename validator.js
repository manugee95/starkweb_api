const Joi = require("joi")

const validator = (schema)=> (payload)=> schema.validate(payload)

const userSchema = Joi.object({
    username: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().required()
})

const feedbackSchema = Joi.object({
    title: Joi.string().required(),
    rating: Joi.number().required()
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateUser = validator(userSchema)
exports.validateFeedback = validator(feedbackSchema)
exports.validateLogin = validator(loginSchema)