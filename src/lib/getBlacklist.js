import axios from 'axios';

async function getBlacklist(currentPage, pageSize) {
  try {
    console.log("all users service has been called");

    const token = localStorage.getItem('token');

   
   

    
   
    const response = await axios.get('http://localhost:4000/api/v1/blacklist', {
      headers: {
        'auth': token
      }
    });

    console.log("Response received:", response);

    return {
      data: response.data,   
      totalCount:response.data.length,

    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error('Error fetching users');
  }
}

export default getBlacklist;
