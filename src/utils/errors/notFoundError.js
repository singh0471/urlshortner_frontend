import ShrinkItError from "./baseError";
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends ShrinkItError {
    constructor(detailedMessage) {
        super(StatusCodes.NOT_FOUND, detailedMessage, "Not Found Error", "Not Found Request");
    }
}

export default NotFoundError;