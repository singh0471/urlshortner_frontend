import ShrinkItError from "./baseError";
import { StatusCodes } from 'http-status-codes';


class UnauthorizedError extends ShrinkItError {
    constructor(detailedMessage) {
        super(StatusCodes.UNAUTHORIZED, detailedMessage, "Unauthorized Error", "Unauthorized Request");
    }
}

export default UnauthorizedError;