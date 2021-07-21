const express = require('express');
const router = express.Router();
const authorization = require("../middleWare/authentication")
const admin = require('../middleWare/admin')
//  CUSTOM MODELS =====
const {Genre, objValidation} = require('../models/genres');

router.get('/', async (req, res, next) => {
    const allGenres =  await Genre.find().sort('title');
    if ( allGenres.length < 1) { return res.send('There are no genres yet.') }
    res.status(200).send(results)
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

router.post('/', authorization, (req, res) => {
    console.log(req)
    // === Create new genre ==
    const createGenre = (obj) => {
        let data = new Genre(obj);
        data.save().then((results) => {
            res.status(200).send(results)
        }).catch((err) => { console.log(err) })
    }

    // === Validate the user request ==
    const responseValidation = objValidation(req.body);
    responseValidation.then((value) => {
        createGenre(value);
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})

router.put('/:id',  authorization,(req, res) => {
    let genreId = req.params.id;
    // === Update function ====
    const updateFunction = (obj) => {
        Genre.findByIdAndUpdate(genreId, obj, { new: true })
            .then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(404).send('There is no genre with that specific id');
                console.log(err)
            })
    }

    // ===== validation ====
    let results = objValidation(req.body);
    results.then((value) => {
        updateFunction(value)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})

router.delete('/:id', [authorization, admin],  (req, res) => {
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