import axios from 'axios';

async function getAllUsersService(currentPage, pageSize, filters = {}) {
  try {
    console.log("all users service has been called");

    const token = localStorage.getItem('token');

   
    const normalizedFilters = Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];
      
      acc[key] = typeof value === 'string' ? value.toLowerCase() : value;
      return acc;
    }, {});

    const params = {
      page: currentPage,  
      limit: pageSize,
      ...normalizedFilters,   
      status: 'active',
      include: ['usersPlans', 'urls']
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
      totalCount: response.headers['x-total-count']
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error('Error fetching users');
  }
}

export default getAllUsersService;
