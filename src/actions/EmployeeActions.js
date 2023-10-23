import HttpClient from '../services/HttpClient';

export const getEmployees = async () => {

    try{
        const response = await HttpClient.get('/employee');
        return response.data;
    }
    catch{
        throw new Error("Unable to get the data from the server");
    }
}
