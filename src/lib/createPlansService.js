import axios from "axios";
import AxiosError from "@/utils/errors/axiosError";

async function createPlansService(data) {
  try {
    const token = localStorage.getItem('token');

    console.log(data)
    if (data.name) {
      data.name = data.name.trim().toLowerCase();
    }
    if (data.description) {
      data.description = data.description.trim().toLowerCase();
    }
   
 

    
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

      if (data && data.specificMessage) {
        throw new Error(data.specificMessage);
      }

      throw new AxiosError(`Error: ${status} - ${data?.error || 'An error occurred while creating the plan.'}`);
    } else if (error.request) {
      throw new AxiosError('No response received from the server. Please check your connection or try again later.');
    } else {
      throw new AxiosError(`An unexpected error occurred: ${error.message}`);
    }
  }
}

export default createPlansService;
