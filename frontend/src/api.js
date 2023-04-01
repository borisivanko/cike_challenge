import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://d937-88-212-24-42.ngrok.io'
});

export default instance;