const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

// === array of generes

const genres = [
    {id: 1, title: 'Action'},
    {id: 2, title: 'Romance'},
    {id: 3, title: 'Comedy'},
    {id: 4, title: 'Horror'},
    {id: 5, title: 'Drama'},
]

app.get('/', (req, res) => {

    res.send('This is the home page')

});

app.get('/api/genres', (req, res) => {
     res.status(200).send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find( value => value.id === genreId);
    if(!genre){return res.status(404).send('There is no genre with that specific id')};

    res.status(200).send(genre)

})



// ==server
app.listen(port, () => `listening to ${port}`)
