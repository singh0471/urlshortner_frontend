import axios from 'axios';
import { verifyToken } from './verifyToken';

async function getUserByUserIdService() {
  try {
    const token = localStorage.getItem('token');   
    
    const tokenData = await verifyToken();
    const userId = tokenData.userId;

    console.log("heree user id");
    

    const response = await axios.get(
      `http://localhost:4000/api/v1/user/get/${userId}`, 
      {
        headers: {
          'auth': token
        }}
    );
    console.log(response)
    return response.data;

      
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching plans');
  }
}

export default getUserByUserIdService;
