const express = require('express');
const router = express.Router();

// custom modules
const { validate, Rental } = require('../models/rentals')


router.get('/', async (req, res) => {
    const results = await Rental.find()
    .populate('customer', 'Name Phone')
    .populate('movie', 'title dailyRentalRate');
    if (results.length < 1) { return res.status(200).send('There are no any rentals at the moment')};
    res.status(200).send(results);
})

router.post('/:customerID/:movieID', (req, res) => {


    const createRental = (customer, movie) => {
        const rental = new Rental({
            customer: customer,
            movie: movie
        })

        rental.save().then((data) => {
          const results = data
          res.status(200).send(results);
        }).catch((err) => console.log(err))
    }

    // ===== validation ==
    let results = validate(req.params);
    results.then((value) => {
        const customerID = value.customerID;
        const movieID = value.movieID;
        createRental(customerID, movieID)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })


})


module.exports = router;