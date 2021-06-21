const express = require('express');
const { Movie, validate } = require('../models/movies')
const { Genre } = require('../models/genres')

const router = express.Router();

router.get('/:genreID/movies', async (req, res) => {
    try {
        const results = await Movie.find();
        if (results.length < 1) return res.status(200).send('There are no movies at the moment');
        res.status(200).send(results)
    } catch (error) {
        console.error(error)
    }

})

router.post('/:genreID/movies', (req, res) => {
    const genreId = req.params.genreID;

    async function createMovie(movieObj, genreObj) {
        const results = new Movie({
            title: movieObj.title,
            genre: {
                _id: genreObj.id,
                title: genreObj.title
            },
            numberInStock: movieObj.numberInStock,
            dailyRentalRate: movieObj.dailyRentalRate

        });
        results.save()
            .then((results) => res.status(200).send(results))
            .catch((err) => console.log(err))
    }


    async function showGenre(movieObj) {
        try {
            const results = await Genre.findById(genreId)
            if (!results) return res.status(400).send('Invalid Genre ID')
            createMovie(movieObj, results)


        } catch (error) {
            console.log(error)
        }
    }

    // ===== validation ==
    let results = validate(req.body);
    results.then((value) => {
        showGenre(value)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})

router.get('/:genreID/movies/:Id', async (req, res) => {
    const results = await Movie.findById(req.params.Id);
    if (!results) return res.status(400).send('The movie ID is invalid');
    res.status(200).send(results)
})

router.put('/:genreID/movies/:Id', (req, res) => {
    const updateFunction = (obj) => {
        Movie.findByIdAndUpdate(req.params.Id, obj, { new: true })
            .then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(404).send('There is no genre with that specific id');
                console.log(err)
            })
    }

    // ===== validation ==
    let results = validate(req.body);
    results.then((value) => {
        updateFunction(value)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})

router.delete('/:genreID/movies/:Id', (req, res) => {

    let movieId = req.params.Id;
    Movie.deleteOne({ _id: movieId })
        .then((data) => {
            res.status(200).send('Genre deleted successfuly..')
            console.log(data)
        }).catch((err) => {
            res.status(404).send('There is no genre with that specific id')
            console.log(err)
        })

})


module.exports = router