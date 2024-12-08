import axios from 'axios';
import AxiosError from "@/utils/errors/axiosError";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
async function loginService(loginData) {
    try {
  
        const trimmedAndLowerCasedData = {
            username: loginData.username.trim().toLowerCase(),   
            password: loginData.password.trim()   
        };

        const response = await axios.post('http://localhost:4000/api/v1/user/login', trimmedAndLowerCasedData);

        const token = response.data;

        if (!token) {
            throw new Error("No token received");
        }

        localStorage.setItem('token', token);

        const tokenWithoutBearer = token.split(" ")[1];
       
    
        Cookies.set("token", tokenWithoutBearer, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        
        const isAdmin = jwtDecode(token.split(" ")[1]).isAdmin;

        
        return { 
            success: true, 
            message: "Login successful", 
            isAdmin 
        };

    } catch (error) {
        
        const errorMessage = error.response?.data?.specificMessage || "An error occurred during login"; 
        const genericMessage = error.response?.data?.message || "An error occurred";  

   
        throw {
            message: genericMessage,
            specificMessage: errorMessage
        };
    }
}

export default loginService;
