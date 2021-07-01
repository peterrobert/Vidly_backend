const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const config = require('config');

// custom modules
const movies = require('./routes/movie')
const customers = require('./routes/customers')
const genres = require('./routes/genres');
const home = require('./routes/home');
const rentals = require('./routes/rentals')
const register = require('./routes/registration')
const trailers = require('./routes/trailer')
const auth = require('./middleWare/authentication')
const errhandling = require("./middleWare/errors")

const app = express();
const port = process.env.PORT || 5000;
// ====check for config setting

// if(!config.get("jwtPrivateKey")){
//    console.log("FATAL ERROR: JWT TOKEN NOT SET");
//    process.exit(1);
// }

// ==== Connect to database.
const databaseConnect = () => {
   mongoose.connect('mongodb://localhost/vivdly')
   .then(() => console.log('database connected successfuly'))
   .catch((err) => console.log(err))
}
databaseConnect();

//====  middle ware
app.use(express.json());


// ===routes
app.use('/api/customers', customers)
app.use('/api/genres', genres);
app.use('/api/genres', movies)
app.use('/api/trailers', trailers)
app.use('/api/rentals', rentals )
app.use('/api/register', register)
app.use('/', home);
// app.use('/api/authenticate', logIn)

// Handling errors and Logging them to a file
app.use(errhandling)




// Check for the enviroment
if(app.get('env') === 'development'){
   app.use(morgan('tiny'));
   console.log('Morgan is installed')
}

// ==server
app.listen(port, () => `listening to ${port}`)
