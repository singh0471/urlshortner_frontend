import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';

async function addToBlacklistService(userId, reason) {
    try {
        const token = localStorage.getItem('token');

        console.log("hiiiiiiiiiiii");

        console.log(userId)
        console.log(reason)
        
        
        if (!token) {
            throw new Error('No token found');
        }

        const data = { userId, reason };
        
        
        const response = await axios.post(
            `http://localhost:4000/api/v1/blacklist`,  
            data,  
            { 
                headers: { 
                    auth: token,   
                }
            }
        );

         
        return response.data;
    } catch (error) {
        
        console.error('Error adding to blacklist:', error.response || error.message);  
        throw new AxiosError(error);   
    }
}

export default addToBlacklistService;
