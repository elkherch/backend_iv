class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);  // Appelle le constructeur de la classe Error
        this.statusCode = statusCode;
    }
}
module.exports = ErrorHandler;