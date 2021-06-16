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


module.exports = router