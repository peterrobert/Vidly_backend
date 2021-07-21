function errHandling(err, res, req, next) {
    res.status(500).send("There was a problem");
}

module.exports = errHandling;

