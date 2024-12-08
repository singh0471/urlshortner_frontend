import axios from 'axios';
import { verifyToken } from './verifyToken';

async function buyPlanService(planIds) {
  try {
     
    const plans = planIds.plans;
    const planIdArray = plans.map(plan => plan.id);

    
    const token = localStorage.getItem('token');   
   

    const tokenData = await verifyToken();
    const userId = tokenData.userId;
    
    const response = await axios.post(
      `http://localhost:4000/api/v1/user/buy-plan/${userId}`, 
      { planIds: planIdArray },  
      {
        headers: {
          'auth': token
        }
      }
    );

    return response.status;
  } catch (error) {
    console.error(error);  
    throw new Error('Error buying plans');
  }
}

export default buyPlanService;
