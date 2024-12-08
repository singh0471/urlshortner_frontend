import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';


async function deleteBlacklistService(userId) {
    try {
        
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }

        
        const response = await axios.delete(
            `http://localhost:4000/api/v1/blacklist/${userId}`,  
            { 
                headers: { 
                    auth: token,    
                }
            }
        );
        
        return response;
    } catch (error) {
         
        console.error(new AxiosError(error));  
        throw new AxiosError(error);
    }
}

export default deleteBlacklistService;

