import HttpClient from '../services/HttpClient';

export const getProducts = async () => {

    try{
        const response = await HttpClient.get('/product');
        return response.data;
    }
    catch{
        throw new Error("Unable to get the data from the server");
    }
}
