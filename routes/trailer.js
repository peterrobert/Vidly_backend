const express = require('express');
const { Movie } = require('../models/movies');
const Router = express.Router();

// Custom models =====
const { Trailer, trailerValidation } = require('../models/trailers');

Router.get('/:movieID/', async (req, res) => {
    const movieTrailer = await Trailer.find();
    if (movieTrailer.length < 1) return res.status(200).send('There are no trailers for this movie');
    res.status(200).send(movieTrailer)
})

Router.post('/:movieID/', (req, res) => {
    const trailerObject = {
        title: req.body.title,
        link: req.body.link,
        movieID: req.params.movieID
    }
    //  ==== Trailer Creation
    const  createTrailer = async (validatedObj) => {
        console.log(validatedObj)
        const movie = await Movie.findById(validatedObj.movieID);
        if(!movie) return("There is no movie with that specific ID");
        const trailer = new Trailer({
            title: validatedObj.title,
            link: validatedObj.link,
            movie:movie
        });
        const saveTrailer = await trailer.save();
        res.status(200).send(saveTrailer)
    }
    // ===== validation
    trailerValidation(trailerObject).then((data) => {
        createTrailer(data)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})

Router.get('/:movieID/:id', async(req, res) => {
    const trailer = await Trailer.findById(req.params.id);
    if(!trailer) return res.status(404).send('There is no trailer with that specific ID');
    res.status(200).send(trailer);
})








// ===== Exports
module.exports = Router