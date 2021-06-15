const mongoose = require('mongoose')
const joi = require('joi');

// Customers MongoDB schema and Model===
const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: {
        type: Boolean,
        require: true
    },
    Name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 30
    },
    Phone: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 30
    }
}));


// VALIDATION ====
const objValidation = (obj) => {
    const schema = {
        isGold: joi.boolean().required(),
        Name: joi.string().required().min(3).max(30),
        Phone: joi.string().required().min(3).max(30)
    }

    return joi.validate(obj, schema)
}


exports.Customer = Customer;
exports.objValidation = objValidation