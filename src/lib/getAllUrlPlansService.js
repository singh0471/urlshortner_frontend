import axios from 'axios';

async function getAllUrlPlanService(currentPage, pageSize,name) {
  try {

    console.log("all urls page ")

    const response = await axios.get('http://localhost:4000/api/v1/plan/get', {
      params: {
        page: currentPage,
        limit: pageSize,
        type:'url',
        name:name
      },
    });

    const filteredData = response.data.filter((plan) => plan.name !== 'free');

    console.log(filteredData)
    return {
      data: filteredData,   
      totalCount: response.headers['x-total-count'] || filteredData.length,  
      
    };
  } catch (error) {
    throw new Error('Error fetching plans');
  }
}

export default getAllUrlPlanService;


// import axios from 'axios';

// async function getAllUrlPlanService(currentPage, pageSize) {
//   try {
//     const response = await axios.get('http://localhost:4000/api/v1/plan/get', {
//       params: {
//         page: currentPage,
//         limit: pageSize,
//         type: 'url',
//       },
//     });


//     if (Array.isArray(response.data)) {
//       const filteredPlans = response.data.filter(plan => {
       
//         return plan.planName && plan.planName.toLowerCase() !== 'free';
//       });

//       return {
//         data: filteredPlans,  
//         totalCount: response.headers['x-total-count'] || filteredPlans.length,  
//       };
//     } else {
//       throw new Error('Expected response.data to be an array');
//     }
//   } catch (error) {
//     console.error('Error fetching plans:', error);
//     throw new Error('Error fetching plans');
//   }
// }

// export default getAllUrlPlanService;
