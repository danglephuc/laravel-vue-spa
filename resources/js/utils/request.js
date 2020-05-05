import '../bootstrap';

// Create axios instance
const service = window.axios.create({
    baseURL: process.env.MIX_BASE_API,
    timeout: 10000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// response pre-processing
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        let message = error.message;
        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }
        return Promise.reject(error);
    }
);

export default service;
