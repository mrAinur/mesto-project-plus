import { BAD_REQUEST_STATUS } from '../utils/constancies';

export default class NotValidData extends Error {
  constructor(public message: string, public statusCode = BAD_REQUEST_STATUS) {
    super(message);
    this.statusCode = statusCode;
  }
}
