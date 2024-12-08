import axios from 'axios';
import { verifyToken } from './verifyToken';

async function getMyUrlsService(page, pageSize, filters = {}) {
  try {
    const token = localStorage.getItem('token');   
    
    const tokenData = await verifyToken();
    const userId = tokenData.userId;

   
    console.log("Filters:", filters);

   
    const params = {
      page: page,
      limit: pageSize,
      ...filters 
    };

    const response = await axios.get(
      `http://localhost:4000/api/v1/user/${userId}/url`, 
      {
        headers: {
          'auth': token
        },
        params: params   
      }
    );

    return {
      data: response.data,   
      totalCount: response.headers['x-total-count']  
    };

  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error('Error fetching URLs');
  }
}

export default getMyUrlsService;
