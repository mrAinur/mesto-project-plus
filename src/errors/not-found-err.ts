import { NOT_FOUND_STATUS } from '../utils/constancies';

export default class NotFoundError extends Error {
  constructor(public message: string, public statusCode = NOT_FOUND_STATUS) {
    super(message);
    this.statusCode = statusCode;
  }
}
