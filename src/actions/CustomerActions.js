import HttpClient from '../services/HttpClient';

export const getCustomers = async () => {

    try{
        const response = await HttpClient.get('/customer');
        return response.data;
    }
    catch{
        throw new Error("Unable to get the data from the server");
    }
}

export const getNextOrders = async () => {

    try{
        const response = await HttpClient.get('/customer/getnextorders');
        return response.data;
    }
    catch{
        throw new Error("Unable to get the data from the server");
    }
}
