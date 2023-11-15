class NotFoundError extends Error {
  constructor(public message: string, public statusCode = 404) {
    super(message);
  }
}

module.exports = NotFoundError;
