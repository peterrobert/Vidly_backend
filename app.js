const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// custom modules
const movies = require('./routes/movie')
const customers = require('./routes/customers')
const genres = require('./routes/genres');
const home = require('./routes/home');
const rentals = require('./routes/rentals')
const register = require('./routes/registration')
const logIn = require('./routes/auth')
const auth = require('./middleWare/authentication')

const app = express();
const port = process.env.PORT || 5000;

// ==== Connect to database.
const databaseConnect = () => {
   mongoose.connect('mongodb://localhost/vivdly')
   .then(() => console.log('database connected successfuly'))
   .catch((err) => console.log(err))
}
databaseConnect();

//====  middle ware
app.use(express.json());
app.use(auth);

// ===routes
app.use('/api/customers', customers)
app.use('/api/genres', genres);
app.use('/api/genres', movies)
app.use('/api/rentals', rentals )
app.use('/api/register', register)
app.use('/api/authenticate', logIn)

app.use('/', home);


// Check for the enviroment
if(app.get('env') === 'development'){
   app.use(morgan('tiny'));
   console.log('Morgan is installed')
}

// ==server
app.listen(port, () => `listening to ${port}`)
