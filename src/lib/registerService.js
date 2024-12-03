import axios from "axios";
import AxiosError from "@/utils/errors/axiosError";

async function registerService(registerData) {
    try {
        console.log("register service")
        const response=  await axios.post('http://localhost:4000/api/v1/user/create', registerData);
        return response;
    } catch (error) {
        console.log(new AxiosError(error));
        throw new AxiosError(error);
        
    }
}


export default registerService