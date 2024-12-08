import axios from "axios";
import AxiosError from "@/utils/errors/axiosError";
import { verifyToken } from "./verifyToken";
async function createShortUrlService(data) {
    try {

        console.log(data)
        const token = localStorage.getItem('token');   
   
        const tokenData = await verifyToken();
        const userId = tokenData.userId;
         console.log(userId);
        const response=  await axios.post(`http://localhost:4000/api/v1/user/${userId}/create-url`, data,
            {
              headers: {
                'auth': token
              }
            });
        return response;
    } catch (error) {
        console.log(new AxiosError(error));
        throw error;
        
    }
}


export default createShortUrlService