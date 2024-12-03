import axios from 'axios';
import AxiosError from "@/utils/errors/axiosError";
 
async function getPlanService() {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/plan/get', {
            params: {
              name: url
            }
          });


        return response;
          
        
    } catch (error) {
        console.log(new AxiosError(error));
        throw new AxiosError(error);
        
    }
}


export default getPlanService;