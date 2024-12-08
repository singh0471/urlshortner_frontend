import axios from 'axios';

async function activateUserService(userId) {
  try {
    const token = localStorage.getItem('token');
   
    
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.delete(`http://localhost:4000/api/v1/blacklist/${userId}`, {
      headers: {
        'auth': token
      }
    });

    return response;
  } catch (error) {
    throw new Error('Error fetching queries');
  }
}

export default activateUserService;
