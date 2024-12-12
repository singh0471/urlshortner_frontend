import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';
import { verifyToken } from './verifyToken';


async function deleteUrlService(urlId) {
    try {

        
       
        const token = localStorage.getItem('token');
        const tokenData = await verifyToken();
        const userId = tokenData.userId;
        
        if (!token) {
            throw new Error('No token found');
        }
       
        
     
        const response = await axios.delete(
            `http://localhost:4000/api/v1/user/${userId}/url/${urlId}`,   
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

export default deleteUrlService;
