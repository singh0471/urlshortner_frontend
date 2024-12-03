import axios from 'axios';
import AxiosError from "@/utils/errors/axiosError";
import { jwtDecode } from 'jwt-decode';
async function loginService(loginData) {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/user/login', loginData);
        
        const token = response.data;
        localStorage.setItem('token', token);
        const isAdmin = jwtDecode(token.split(" ")[1]).isAdmin;
        return isAdmin;
    } catch (error) {
        console.log(new AxiosError(error));
        throw new AxiosError(error);
        
    }
}


export default loginService