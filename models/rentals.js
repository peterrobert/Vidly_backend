const mongoose = require('mongoose');
const Joi = require('joi');


const rentalSchema = mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    movie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
})


// ==== joi validation

const validate = (obj) => {
     const schema = {
         customerID: Joi.string().required(),
         movieID: Joi.string().required(),
     }
     return Joi.validate(obj, schema)
}

const Rental = mongoose.model('Rental', rentalSchema)

exports.validate = validate;
exports.Rental = Rental;