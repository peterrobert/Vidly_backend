const express = require('express');
const morgan = require('morgan');
// custom modules
const genres = require('./routes/genres');
const home = require('./routes/home');
const auth = require('./middleWare/authentication')

const app = express();
const port = process.env.PORT || 3000;

// middle ware
app.use(express.json());
app.use(auth);

// ===routes
app.use('/api/genres', genres);
app.use('/', home);



// Check for the enviroment
if(app.get('env') === 'development'){
   app.use(morgan('tiny'));
   console.log('Morgan is installed')
}

// ==server
app.listen(port, () => `listening to ${port}`)
