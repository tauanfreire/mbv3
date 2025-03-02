import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.1.111:3000"  // Adicione o http:// aqui
});

export default api;
