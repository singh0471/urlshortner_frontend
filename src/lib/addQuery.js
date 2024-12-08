import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { verifyToken } from './verifyToken';

async function addQueryService(queryText) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
  console.log("first")
    //const userId = jwtDecode(token.split(" ")[1]).userId;
    const tokenData = await verifyToken();
    const userId = tokenData.userId;
    
    const response = await axios.post(
      `http://localhost:4000/api/v1/user/${userId}/query`, 
      { queryText },  
      {
        headers: {
          'auth': token,   
        },
      }
    );

    
    return response.data;  
  } catch (error) {
    console.error('Error adding query:', error);
    throw new Error('Error adding query. Please try again.');
  }
}

export default addQueryService;

 