const express = require('express');
const router = express.Router();
const Joi = require('joi');


//=== Validate function
const objValidation = (obj) => {
    const schema = {
        title: Joi.string().max(30).min(3).required()
    }
    return Joi.validate(obj, schema)
}


// === array of genres
const genres = [
    { id: 1, title: 'Action' },
    { id: 2, title: 'Romance' },
    { id: 3, title: 'Comedy' },
    { id: 4, title: 'Horror' },
    { id: 5, title: 'Drama' },
]

router.get('/', (req, res) => {
    res.status(200).send(genres)
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
        const obj = {
            id: genres.length + 1,
            title: value.title
        }
        genres.push(obj);
        res.status(200).send(obj)
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