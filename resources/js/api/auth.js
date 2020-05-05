import request from '../utils/request'

export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: data,
    });
}

export function getInfo() {
    return request({
        url: '/auth/user',
        method: 'get',
    });
}

export function csrf() {
    return request({
        url: '/sanctum/csrf-cookie',
        method: 'get',
    });
}
