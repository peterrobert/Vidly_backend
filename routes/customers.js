const express = require('express');

// CUSTOM MODULES ====
const{Customer, objValidation} = require('../models/customer')

// === Router ===
const router = express.Router();

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

router.delete('/:id',  async (req, res) => {
   try {
    const results = await Customer.findByIdAndDelete(req.params.id)
     res.status(200).send(results);
   } catch (error) {
       console.log(error)
   }
   
})


// Export ===
module.exports = router;