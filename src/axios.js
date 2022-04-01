import axios from "axios";
import store from "./store";
import router from "./router";

// const axiosClient = axios.create({
//     baseUrl: 'http://127.0.0.1:8000/api'
// })
// axiosClient.interceptors.request.use(config => {
//     config.headers.Authorization = `Bearer ${store.state.user.token}`
//     return config;
// })


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // timeout: 1000,
    headers: {
        'accept': 'application/json'
    }
});
export default axiosInstance;