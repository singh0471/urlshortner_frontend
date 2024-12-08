import axios from 'axios';
import { verifyToken } from './verifyToken';

async function getMySubmittedQueryService(currentPage, pageSize) {
  try {

    const token = localStorage.getItem('token');
    const tokenData = await verifyToken();
    const userId = tokenData.userId;

    const response = await axios.get(`http://localhost:4000/api/v1/user/${userId}/query`, {
      headers:{
        'auth':token
    },
      params: {
        page: currentPage,
        limit: pageSize,

      },
    });


    console.log(response);
    

    return {
      data: response.data,   
      totalCount: response.headers['x-total-count'] || response.data.length,  
    };
  } catch (error) {
    throw new Error('Error fetching plans');
  }
}

export default getMySubmittedQueryService;