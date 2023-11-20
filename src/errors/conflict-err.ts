import { CONFLICT_STATUS } from '../utils/constancies';

export default class ConflictError extends Error {
  constructor(public message: string, public statusCode = CONFLICT_STATUS) {
    super(message);
    this.statusCode = statusCode;
  }
}
