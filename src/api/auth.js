// src/api/auth.js

import request from '@/router/request';

export const login = (username, password) => {
    return request({
        url: 'auth/myLogin',
        method: 'post',
        data: new URLSearchParams({
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
