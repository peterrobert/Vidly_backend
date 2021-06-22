const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require("joi");



// CUSTOM MODULES ==== 
const { User } = require('../models/registration')
const generateToken = require('../Logic')

// bcypt salt 
const saltRounds = 10


router.post('/', (req, res) => {
  // =====Validate User data
  const validateUser = (obj) => {
    const schema = {
      email: Joi.string().required().min(5).max(255),
      password: Joi.string().required().min(6).max(255)
    }

    return Joi.validate(obj, schema)
  }

  async function authenticateUser(obj) {
    try {
      let checkUser = await User.findOne({ email: obj.email });
      if (!checkUser) return res.status(400).send('invalid email or password');

      const checkPasswords = await bcrypt.compare(obj.password, checkUser.password)
      if (!checkPasswords) return res.status(400).send('invalid email or password')

      const token = generateToken(checkUser);
      res.header('x-auth-token', token).send(_.pick(checkUser, ['name', 'email', '_id']))
    } catch (error) {
      console.log(error)
    }

  }

  validateUser(req.body).then((data) => {
    authenticateUser(data)

  }).catch((err) => {
    res.status(404).send(err.details[0].message)
  })



})

module.exports = router