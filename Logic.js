const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    const token = jwt.sign({_id: user._id, name: user.name}, "jwtPrivateKey");
    return token
}

module.exports = generateToken;