const mongoose = require('mongoose');
const Joi = require('joi');

// ===CUSTOM MODELS
const {genreSchema} = require('../models/genres');

//  ==== REQUEST VALIDATIONS

const movieObjValidation = (obj) => {
    const schema = {
        title: Joi.string().required(),
        genre: Joi.object().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    }
}


// MOVIE SCHEMA =====

const movieSchema = mongoose.Schema({
    title: String,
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
})

// Movie Model =====

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validate = movieObjValidation;