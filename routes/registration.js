const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// CUSTOM MODULES ==== 
const {User, validate} = require('../models/registration')

// bcypt salt 
const saltRounds = 10


router.post('/', (req, res) => {

    async function registerUser(userObj) {
        try {
        
            let checkUser =  await User.findOne({email: req.body.email});
            if(checkUser) return res.status(400).send('The email has already been taken'); 
            const hideSalt = await bcrypt.genSalt(saltRounds);
            const userPassword = await bcrypt.hash(req.body.password, hideSalt)
             
            const user = new User({
                name: userObj.name,
                email: userObj.email,
                password: userPassword
            });
            const data = await user.save();
            const token = await jwt.sign({_id: checkUser._id, name: checkUser.name}, "jwtPrivateKey")
            res.header('x-auth-token', token).send(_.pick(data, ['_id', 'name', 'email']) )
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