import axios from "axios";


async function getAllUrlsService(currentPage, pageSize, filters) {
    try {
      const token = localStorage.getItem('token');


      console.log(filters.toClicksLeft)
      
      
     
      const params = {
        page: currentPage,
        limit: pageSize,
        ...filters   
      };
  
      const response = await axios.get('http://localhost:4000/api/v1/urls', {
        headers: {
          'auth': token
        },
        params: params
      });
  
      return {
        data: response.data,
        totalCount: response.headers['x-total-count'] || response.data.length,
      };
    } catch (error) {
      console.error("Error fetching URLs:", error);
      throw new Error('Error fetching URLs');
    }
  }
  
  export default getAllUrlsService;
  