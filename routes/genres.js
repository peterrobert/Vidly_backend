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
        if(results.length < 1){return res.send('There are no genres yet.')}
        res.status(200).send(results)
    }).catch((err) => console.log(err));
   
})

router.get('/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find(value => value.id === genreId);
    if (!genre) { return res.status(404).send('There is no genre with that specific id') };
    res.status(200).send(genre);
});

router.post('/', (req, res) => {
    const responseValidation = objValidation(req.body);
    responseValidation.then((value) => {
        let data = new Genre(value);
        data.save().then((results) => {   
            res.status(200).send(results)
        })  
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})

router.put('/:id', (req, res) => {
    let genreId = parseInt(req.params.id);

    let genre = genres.find((value) =>  value.id === genreId );
    if (!genre) { return res.status(404).send('There is no genre with that specific id') };

    // validation
    let results = objValidation(req.body);
    results.then((value) => {
       genre.title = value.title;
       res.status(200).send(genre)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})

router.delete('/:id', (req,res) => {
   let genreId = parseInt(req.params.id);
   let genre = genres.find((value) =>  value.id === genreId );
   if (!genre) { return res.status(404).send('There is no genre with that specific id') };

   let removeItem = genreId - 1;
   let ans =  genres.splice(removeItem, 1);
   res.status(200).send(ans)

})


module.exports = router