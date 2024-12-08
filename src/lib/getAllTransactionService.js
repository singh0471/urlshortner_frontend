import axios from 'axios';

async function getAllTransactionService(currentPage, pageSize, filters = {}) {
  try {
    const token = localStorage.getItem('token');   
    
    if (!token) {
      throw new Error('Authorization token not found.');
    } 

    const params = {
      page: currentPage,
      limit: pageSize,
      ...filters,   
    };

    console.log("Request Params:", params);

    const response = await axios.get('http://localhost:4000/api/v1/transaction', {
      params: params,   
      headers: {
        auth: token,   
      },
    });
    console.log(response)

    
    const totalCount = response.headers['x-total-count'] 
      ? parseInt(response.headers['x-total-count'], 10)
      : response.data.length;

    return {
      data: response.data,
      totalCount,  
    };

  } catch (error) {
    
    console.error("Error fetching transactions:", error);
    throw new Error('Error fetching transactions');   
  }
}

export default getAllTransactionService;
