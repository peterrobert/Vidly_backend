const express = require('express');
const Joi = require('joi');


const app = express();
const port = process.env.PORT || 3000;

// middle ware
app.use(express.json());


// === array of genres

const genres = [
    { id: 1, title: 'Action' },
    { id: 2, title: 'Romance' },
    { id: 3, title: 'Comedy' },
    { id: 4, title: 'Horror' },
    { id: 5, title: 'Drama' },
]


//=== Validate function
const objValidation = (obj) => {
    const schema = {
        title: Joi.string().max(30).min(3).required()
    }
    return Joi.validate(obj, schema)
}


app.get('/', (req, res) => {
    res.send('This is the home page');
});

app.get('/api/genres', (req, res) => {
    res.status(200).send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find(value => value.id === genreId);
    if (!genre) { return res.status(404).send('There is no genre with that specific id') };
    res.status(200).send(genre);
});

app.post('/api/genres', (req, res) => {
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

app.put('api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);

    const genre = genres.find((value) => { return value.id === genreId });
    if (!genre) { return res.status(404).send('There is no genre with that specific id') };

    // validation
    const results = objValidation(req.body);
    results.then((value) => {
        console.log(value)
    }).catch((err) => {
        console.log(err)
    })

})

app.post('/api/genres', (req, res) => {
})


// ==server
app.listen(port, () => `listening to ${port}`)
