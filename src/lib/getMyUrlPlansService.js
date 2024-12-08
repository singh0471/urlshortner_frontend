import axios from 'axios';
import { verifyToken } from './verifyToken';

async function getMyUrlPlansService(page, pageSize,filters={}) {
  try {
    const token = localStorage.getItem('token');   
    
    const tokenData = await verifyToken();
    const userId = tokenData.userId;

    const params = {
      page: page,  
      limit: pageSize,
      planType:'url',
      ...filters  
    };

     

    const response = await axios.get(
      `http://localhost:4000/api/v1/user/${userId}/plans`, 
      {
        headers: {
          'auth': token
        },
        params: params
      }
    );

    console.log(response)

    return {
      data: response.data,   
      totalCount: response.headers['x-total-count']  
    };

      
  } catch (error) {
    console.error(error);
    // throw new Error('Error fetching plans');
  }
}

export default getMyUrlPlansService;
