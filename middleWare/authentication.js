const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
   const token = req.header('x-auth-token');
   if (!token) return res.status(401).send('You are not permitted to perform this operation');

try {
    const results = jwt.verify(token, "jwtPrivateKey");
    req.user = results;
    next();

} catch (error) {
    res.status(400).send("Please provide the right authentication token") 
}

}

module.exports = authentication