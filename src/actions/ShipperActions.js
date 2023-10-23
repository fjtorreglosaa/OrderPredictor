import HttpClient from '../services/HttpClient';

export const getShippers = async () => {

    try{
        const response = await HttpClient.get('/shipper');
        return response.data;
    }
    catch{
        throw new Error("Unable to get the data from the server");
    }
}