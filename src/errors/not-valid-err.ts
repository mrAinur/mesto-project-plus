class NotValidData extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = NotValidData;
