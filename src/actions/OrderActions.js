import HttpClient from '../services/HttpClient';

export const getOrdersbyCustomer = async ( clientId ) => {

    if( clientId === null || clientId === undefined ) return;
    
    try{
        const response = await HttpClient.get(`/Order/ByCustomer?clientId=${clientId}`);
        return response.data;
    }
    catch{
        throw new Error("Unable to get the data from the server");
    }
}

export const createOrder = async (order) => {

    if( order === null || order === undefined ) return;

    try{
        const response = await HttpClient.post('/order', order);
        return response.data;
    }
    catch{
        throw new Error("Unable to post the data to the server");
    }
}