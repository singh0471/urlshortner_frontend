import axios from 'axios';
import { verifyToken } from './verifyToken';

async function analyzeUrlsService(id) {
  try {
    const token = localStorage.getItem('token');   
    const tokenData = await verifyToken();
    const userId = tokenData.userId;

    const response = await axios.get(
      `http://localhost:4000/api/v1/user/${userId}/url/${id}/analyze`, 
      {
        headers: {
          'auth': token
        }
      }
    );

    return {
      data: response.data,   
      totalCount: response.headers['x-total-count']  
    };

      
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching plans');
  }
}

export default analyzeUrlsService;
