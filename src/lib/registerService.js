import axios from "axios";
import AxiosError from "@/utils/errors/axiosError";

async function registerService(registerData) {
    try {
        console.log("Register service");

        const trimmedAndLowerCasedData = Object.fromEntries(
            Object.entries(registerData).map(([key, value]) => [
                key,
              
                typeof value === "string"
                    ? (key === "password" ? value.trim() : value.trim().toLowerCase())
                    : value,
            ])
        );

        console.log(trimmedAndLowerCasedData)

        const response = await axios.post('http://localhost:4000/api/v1/user/create', trimmedAndLowerCasedData);
        return response;
    } catch (error) {
        if (error?.response?.data?.specificMessage) {
            throw new Error(error.response.data.specificMessage);
          }
      
          console.log(new AxiosError(error));
          throw new AxiosError(error);
     
    }
}

export default registerService;
