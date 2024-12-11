import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';  
import { jwtDecode } from 'jwt-decode';  

async function updatePlanService(planId, updateData) {
    try {
        
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }

      
        const formattedData = updateData.map((update) => {
     
            if (update.parameter === 'name' || update.parameter === 'description') {
                return { ...update, value: update.value.trim() }; 
            }

          
            if (['numberOfUrlsRenewed', 'totalClicksPerUrl'].includes(update.parameter)) {
                return { ...update, value: parseInt(update.value, 10) }; 
            }

            return update;
        });

        console.log(formattedData);  

        
        const userId = jwtDecode(token.split(" ")[1]).userId;

        
        const response = await axios.put(
            `http://localhost:4000/api/v1/plan/update/${planId}`, 
            formattedData,   
            {
                headers: { 
                    auth: token,   
                }
            }
        );
        
        return response.data; 

    } catch (error) {
         
        console.error(new AxiosError(error));
        throw new AxiosError(error);
    }
}

export default updatePlanService;

