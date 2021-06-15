const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');

// === Router ===
const router = express.Router();

// Customers MongoDB schema and Model===
const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: {
        type: Boolean,
        require: true
    },
    Name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 30
    },
    Phone: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 30
    }
}));

// VALIDATION ====
const objValidation = (obj) => {
    const schema = {
        isGold: joi.boolean().required(),
        Name: joi.string().required().min(3).max(30),
        Phone: joi.string().required().min(3).max(30)
    }

    return joi.validate(obj, schema)
}

router.get('/', async (req, res) => {
    try {
        const results = await Customer.find();
        if (results.length < 1) return res.status(200).send('There are no customers at the moment');
        res.status(200).send(results)

    } catch (error) {
        console.error(error)
    }
})

router.post('/', (req, res) => {
    // CREATE THE CUSTOMER ====
    const createCustomer = (obj) => {
        let result = new Customer(obj);
        result.save().then((value) => {
            res.status(200).send(value)
        }).catch((err) => { console.log(err) })
    };

    // VALIDATE ======
    const responseValidation = objValidation(req.body);
    responseValidation.then((value) => {
        createCustomer(value);
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})

router.get('/:id', async (req, res) => {
    try {
        const result = await Customer.findById(req.params.id);
        if (!result) return res.status(404).send('There is no customer with that ID');
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id',  (req, res) => {

    // UPDATE THE CUSTOMER ====
     const customerUpdate = (obj) => {
        Customer.findByIdAndUpdate(req.params.id, obj, {new: true})
        .then((result) => {
            if(!result) return res.status(404).send('There is no customer with that id');
            res.status(200).send(result)
        })
        .catch((err) => console.log(err));
     }
     

    // VALIDATE =====
    const responseValidation = objValidation(req.body);
    responseValidation.then((value) => {
       customerUpdate(value)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})







// Export ===
module.exports = router;