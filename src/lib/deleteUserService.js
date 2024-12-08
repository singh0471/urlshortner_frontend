import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';
import { verifyToken } from './verifyToken';

async function deleteUserService(updateData) {
    try {
       
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }

        console.log(updateData);
        
     
       

        const tokenData = await verifyToken();
        const userId = tokenData.userId;
        
     
        const response = await axios.delete(
            `http://localhost:4000/api/v1/user/delete/${userId}`,   
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

export default deleteUserService;
