const ErrorResponse = require('./ErrorResponse')

const errorHandler = (err, res) => {
    let error = Object.assign({}, err)

    error.message = err.message

    // Log to console for dev
    // console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`
        error = new ErrorResponse(message, 404)
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `this ${err.resource || 'resource'} already exists`
        error = new ErrorResponse(message, 400)
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map(val => val.message)
            .join(' , ')
        error = new ErrorResponse(message, 400)
    }
    //   joi error

    if (err.from === 'joi') {
        // it's a joy validate object
        const message = err.details.map(d => d.message).join(', \n')
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        msg: error.message || 'Internal Server Error',
    })
}

module.exports = errorHandler
