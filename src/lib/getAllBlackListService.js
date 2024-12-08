import axios from 'axios';

async function getAllBlacklistService(currentPage, pageSize, filters = {}) {
  try {
    console.log("all users service has been called");

    const token = localStorage.getItem('token');

   
    const params = {
      page: currentPage,  
      limit: pageSize,
      ...filters,
      status:'blacklisted'
    };

    
   
    const response = await axios.get('http://localhost:4000/api/v1/user/get', {
      headers: {
        'auth': token
      },
      params: params
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

export default getAllBlacklistService;
