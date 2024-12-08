import axios from 'axios';

async function getAllClicksPlanService(currentPage, pageSize,name) {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/plan/get', {
      params: {
        page: currentPage,
        limit: pageSize,
        type:'clicks',
        name:name
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

export default getAllClicksPlanService;