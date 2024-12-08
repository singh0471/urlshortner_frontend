import axios from 'axios';

async function addressQueryService(id, userId, adminResponse) {
  try {
    const token = localStorage.getItem('token');

    console.log("user id ",userId)
    console.log(id)
    console.log(adminResponse)
    if (!token) { 
      throw new Error('No token found');
    }

    const response = await axios.put(`http://localhost:4000/api/v1/user/address-query/${id}`, 
      { adminResponse, userId },   
      {
        headers: {
          'auth': token,   
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error addressing query:', error);
    throw new Error('Error addressing query');
  }
}

export default addressQueryService;
