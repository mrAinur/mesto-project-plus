import { FORBIDDEN_STATUS } from '../utils/constancies';

export default class ForbiddenError extends Error {
  constructor(public message: string, public statusCode = FORBIDDEN_STATUS) {
    super(message);
    this.statusCode = statusCode;
  }
}
