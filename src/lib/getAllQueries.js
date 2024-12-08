import axios from 'axios';

async function getAllQueryService(currentPage, pageSize,filters={}) {
  try {
    const token = localStorage.getItem('token');
   
    
    if (!token) {
      throw new Error('No token found');
    }

    const params = {
      page: currentPage,
      limit: pageSize,  
      ...filters
    };
    

   


    const response = await axios.get(`http://localhost:4000/api/v1/user/get-queries`, {
      headers: {
        'auth': token
      },
      params: params
    });

    console.log("hello ",response);
    
  
    
    return {
      data: response.data,  
      totalCount: response.headers['x-total-count'] || filteredData.length,  
    };
  } catch (error) {
    throw new Error('Error fetching queries');
  }
}

export default getAllQueryService;
