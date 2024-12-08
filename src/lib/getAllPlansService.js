import axios from 'axios';

async function getAllPlansService(currentPage, pageSize,filters={}) {
  try {

    const params = {
        page:currentPage,
        limit:pageSize,
        ...filters
    }
    const response = await axios.get('http://localhost:4000/api/v1/plan/get', {
      params: params
    });

    return {
      data: response.data,   
      totalCount: response.headers['x-total-count'] || response.data.length,  
    };
  } catch (error) {
    throw new Error('Error fetching plans');
  }
}

export default getAllPlansService;