import { UNAUTHORIZED_STATUS } from '../utils/constancies';

export default class NotAuthError extends Error {
  constructor(public message: string, public statusCode = UNAUTHORIZED_STATUS) {
    super(message);
    this.statusCode = statusCode;
  }
}
