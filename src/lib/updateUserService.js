// import axios from 'axios';
// import AxiosError from '@/utils/errors/axiosError';
// import { verifyToken } from './verifyToken';

// async function updateUserService(updateData) {
//     try {
 
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//             throw new Error('No token found');
//         }

 
//         const updatedData = updateData.map((data) => {
//             if (data.parameter === 'username') {
//                 return { ...data, value: data.value.trim().toLowerCase() };
//             }
//             if (data.parameter === 'password') {
//                 return { ...data, value: data.value.trim() }; 
//             }
//             if (data.parameter === 'firstName' || data.parameter === 'lastName' || data.parameter === 'email') {
//                 return { ...data, value: data.value.trim().toLowerCase() };
//             }
//             return data;
//         });

//         console.log(updatedData);
        
       
//         const tokenData = await verifyToken();
//         const userId = tokenData.userId;

         
//         const response = await axios.put(
//             `http://localhost:4000/api/v1/user/update/${userId}`, 
//             updatedData,  
//             {
//                 headers: { 
//                     auth: token,   
//                 }
//             }
//         );
        
//         return response;
//     } catch (error) {
//         console.error(new AxiosError(error));  
//         throw new AxiosError(error);
//     }
// }

// export default updateUserService;


import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';  // Assuming this is a custom error handler
import { verifyToken } from './verifyToken';

async function updateUserService(updateData) {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }

        const updatedData = updateData.map((data) => {
            if (data.parameter === 'username') {
                return { ...data, value: data.value.trim().toLowerCase() };
            }
            if (data.parameter === 'password') {
                return { ...data, value: data.value.trim() }; 
            }
            if (data.parameter === 'firstName' || data.parameter === 'lastName' || data.parameter === 'email') {
                return { ...data, value: data.value.trim().toLowerCase() };
            }
            return data;
        });

        console.log(updatedData);

        const tokenData = await verifyToken();
        const userId = tokenData.userId;

        const response = await axios.put(
            `http://localhost:4000/api/v1/user/update/${userId}`, 
            updatedData,  
            {
                headers: { 
                    auth: token,   
                }
            }
        );
        
        return response;
    } catch (error) {
        
        const errorMessage = error.response?.data?.specificMessage || 'An error occurred during the update process.';
        const genericMessage = error.response?.data?.message || 'An error occurred during the update process.';

        
        throw {
            message: genericMessage,
            specificMessage: errorMessage
        };
    }
}

export default updateUserService;
