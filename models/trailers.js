const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

// === Custom models
const {movieSchema} = require('./movies')

// ==== Database schema

const trailerSchema = mongoose.Schema({
    title: String,
    link: String,
    movie: {
        type: movieSchema,
        required: true
    }
});

// ==== Trailers Model

const Trailer = mongoose.model('Trailer', trailerSchema);

// ==== Joi validation for user response

const trailerValidation = (obj) => {
    const schema = {
        title: Joi.string().required().min(3).max(50),
        link: Joi.string().required().min(3).max(100),
        movieID: Joi.objectId()
    }

   return  Joi.validate(obj, schema)
}

// Exports ======

exports.trailerSchema = trailerSchema;
exports.Trailer = Trailer,
exports.trailerValidation = trailerValidation