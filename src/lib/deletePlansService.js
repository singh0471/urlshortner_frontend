import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';


async function deletePlanService(planId) {
    try {
       
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }
       
        console.log(planId)
     
        const response = await axios.delete(
            `http://localhost:4000/api/v1/plan/delete/${planId}`,   
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

export default deletePlanService;
