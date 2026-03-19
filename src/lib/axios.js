import axios from 'axios';

import {
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';

export const api = axios.create({
    baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
});

api.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    if (!accessToken) {
        return request;
    }
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== '/users/refresh-token'
        ) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(
                LOCAL_STORAGE_REFRESH_TOKEN_KEY
            );
            if (!refreshToken) {
                return Promise.reject(error);
            }
            try {
                const response = await api.post('/users/refresh-token', {
                    refreshToken,
                });
                const { accessToken, refreshToken: newRefreshToken } =
                    response.data;
                localStorage.setItem(
                    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
                    accessToken
                );
                localStorage.setItem(
                    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
                    newRefreshToken
                );
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
