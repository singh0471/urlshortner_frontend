import axios from 'axios';
import AxiosError from '@/utils/errors/axiosError';  // Assuming you have a custom error handler
import { jwtDecode } from 'jwt-decode';  // Assuming you are using this for decoding JWT token

async function updatePlanService(planId, updateData) {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }

        // Ensure that the `updateData` contains valid parameters and values
        const formattedData = updateData.map((update) => {
            // Trim values for specific fields if necessary (like name, description)
            if (update.parameter === 'name' || update.parameter === 'description') {
                return { ...update, value: update.value.trim() };  // Ensure no leading/trailing spaces
            }

            // For other fields like number of URLs or clicks, make sure values are numbers
            if (['numberOfUrlsRenewed', 'totalClicksPerUrl'].includes(update.parameter)) {
                return { ...update, value: parseInt(update.value, 10) };  // Ensure it's a valid integer
            }

            return update;
        });

        console.log(formattedData);  // Log the formatted data before sending

        // Decode the JWT token to extract user information, if necessary
        const userId = jwtDecode(token.split(" ")[1]).userId;

        // Make the PUT request to update the plan
        const response = await axios.put(
            `http://localhost:4000/api/v1/plan/update/${planId}`, 
            formattedData,  // Send the updated data
            {
                headers: { 
                    auth: token,  // Send the token as Authorization header
                }
            }
        );
        
        return response.data;  // Return the response data (updated plan)

    } catch (error) {
        // Handle errors with a custom AxiosError class (if applicable)
        console.error(new AxiosError(error));
        throw new AxiosError(error);
    }
}

export default updatePlanService;

