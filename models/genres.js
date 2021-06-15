const Joi = require('joi');
const mongoose = require('mongoose');

//=== Validate function==
const objValidation = (obj) => {
    const schema = {
        title: Joi.string().max(30).min(3).required()
    }
    return Joi.validate(obj, schema)
}

// ===== Genre Schema==
const genreSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// ===== Genre Model ==
const Genre = mongoose.model('Genre', genreSchema);

exports.objValidation = objValidation;
exports.Genre = Genre;