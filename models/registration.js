const mongoose = require("mongoose")
const Joi = require ("joi");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength:5,
        maxlength:100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
})

const User = mongoose.model('User', userSchema)

// joi validation

const validate = (obj) => {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(100),
        password: Joi.string().required().min(6).max(100)
    }

    return Joi.validate(obj, schema);
}


exports.User = User;
exports.validate = validate