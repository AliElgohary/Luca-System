class ErrorResponse extends Error {
    constructor(message, statusCode , from) {
      super(message);
      this.statusCode = statusCode;
      this.from = from
      // Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ErrorResponse;