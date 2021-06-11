const authentication = (req, res, next) => {
    console.log('authentication middleWare read');


    next();
}

module.exports = authentication