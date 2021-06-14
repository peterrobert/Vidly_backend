const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');


//=== Validate function
const objValidation = (obj) => {
    const schema = {
        title: Joi.string().max(30).min(3).required()
    }
    return Joi.validate(obj, schema)
}

// ===== Genre Schema
const genreSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
});


// ===== Genre Model
const Genre = mongoose.model('Genre', genreSchema);

router.get('/', (req, res) => {
    Genre.find().then((results) => {
        if (results.length < 1) { return res.send('There are no genres yet.') }
        res.status(200).send(results)
    }).catch((err) => console.log(err));

})

router.get('/:id', (req, res) => {
    const genreId = req.params.id;
    Genre.findById(genreId).then((genre) => {
        res.status(200).send(genre);
    }).catch((err) => {
        console.log(err)
        res.status(404).send('There is no genre with that specific id')
    });
});

router.post('/', (req, res) => {
    // === Create new genre
    const createGenre = (obj) => {
        let data = new Genre(obj);
        data.save().then((results) => {
            res.status(200).send(results)
        }).catch((err) => { console.log(err) })
    }

    // === Validate the user request
    const responseValidation = objValidation(req.body);
    responseValidation.then((value) => {
        createGenre(value);
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})

router.put('/:id', (req, res) => {
    let genreId = req.params.id;
    // === Update function
    const updateFunction = (obj) => {
        Genre.findByIdAndUpdate(genreId, obj, { new: true })
            .then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(404).send('There is no genre with that specific id');
                console.log(err)
            })
    }

    // ===== validation
    let results = objValidation(req.body);
    results.then((value) => {
        updateFunction(value)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})

router.delete('/:id', (req, res) => {
    let genreId = req.params.id;
    Genre.deleteOne({ _id: genreId })
        .then((data) => {
            res.status(200).send('Genre deleted successfuly..')
            console.log(data)
        }).catch((err) => {
            res.status(404).send('There is no genre with that specific id')
            console.log(err)
        })

})


module.exports = router