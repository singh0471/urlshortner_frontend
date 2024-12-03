import { StatusCodes } from "http-status-codes";
import ShrinkItError from "./baseError";

class AxiosError extends ShrinkItError {
    constructor(axiosError) {
         
        const statusCode = axiosError.response ? axiosError.response.status : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = axiosError.response ? axiosError.response.data.message : "An unexpected error occurred";
        const detailedMessage = axiosError.response ? axiosError.response.data.details : "No additional details available";

         
        super(statusCode, "AxiosError", message, detailedMessage);
    }
}

export default AxiosError;