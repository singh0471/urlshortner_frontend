import axios from 'axios';


async function totalRevenueByUserIdService(userId) {
  try {
    const token = localStorage.getItem('token');   
     

    
   

    const response = await axios.get(
      `http://localhost:4000/api/v1/user/${userId}/revenue`, 
      {
        headers: {
          'auth': token
        }  
      }
    );

    return {
      data: response.data,    
      
    };

  } catch (error) {
    console.error("Error fetching revenue:", error);
    throw new Error('Error fetching revenue');
  }
}

export default totalRevenueByUserIdService;
