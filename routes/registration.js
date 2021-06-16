const express = require('express');
const router = express.Router();

// CUSTOM MODULES ==== 
const {User, validate} = require('../models/registration')


router.post('/', (req, res) => {

    async function registerUser(userObj) {
        try {
            const user = new User(userObj);
            const data = await user.save();
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
        }
      
    }

    // === Validate user request
      let results = validate(req.body);
      results.then((value) => {
        registerUser(value)
      }).catch((err) => {
          res.status(404).send(err.details[0].message)
      })

})

module.exports = router