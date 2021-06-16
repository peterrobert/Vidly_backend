const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const rentalSchema = mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    movie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type:Date
    },
    rentalFee:{
        type:Number,
        min: 0
    }
})


// ==== joi validation

const validate = (obj) => {
     const schema = {
         customerID: Joi.objectId().required(),
         movieID: Joi.objectId().required(),
     }
     return Joi.validate(obj, schema)
}

const Rental = mongoose.model('Rental', rentalSchema)

exports.validate = validate;
exports.Rental = Rental;