import Axios from "axios";

Axios.defaults.baseURL = 'https://localhost:7161/api';

const genericRequest = {
    get    : (url) => Axios.get(url),
    post   : (url, body) => Axios.post(url, body),
    put    : (url, body) => Axios.put(url, body),
    delete : (url) => Axios.delete(url)
};

export default genericRequest;