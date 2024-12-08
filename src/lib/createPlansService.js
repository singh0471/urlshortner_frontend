import axios from "axios";
import AxiosError from "@/utils/errors/axiosError";
import { verifyToken } from "./verifyToken";


async function createPlansService(data) {
  try {
    const token = localStorage.getItem('token');
    

    const tokenData = await verifyToken();
    const userId = tokenData.userId;

    const response = await axios.post(`http://localhost:4000/api/v1/plan/create`, data, {
      headers: {
        'auth': token,
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    if (error.response) {
      const { data, status } = error.response;

      // Check for specific error message from the backend
      if (data && data.specificMessage) {
        // Return the specific message from the backend
        throw new Error(data.specificMessage); // This will allow you to capture the specific message in your component.
      }

      // Fallback to general error message if no specific message is found
      throw new AxiosError(`Error: ${status} - ${data?.error || 'An error occurred while creating the plan.'}`);
    } else if (error.request) {
      throw new AxiosError('No response received from the server. Please check your connection or try again later.');
    } else {
      throw new AxiosError(`An unexpected error occurred: ${error.message}`);
    }
  }
}

export default createPlansService;
