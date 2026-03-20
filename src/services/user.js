import { api } from '@/lib/axios';

export const UserService = {
    signup: async (data) => {
        const response = await api.post('/users', {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
        });
        return {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            tokens: response.data.tokens,
        };
    },
    login: async (data) => {
        const response = await api.post('/users/login', {
            email: data.email,
            password: data.password,
        });
        return {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            tokens: response.data.tokens,
        };
    },
    me: async () => {
        const response = await api.get('/users/me');
        return {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            tokens: response.data.tokens,
        };
    },
    getBalance: async (data) => {
        const queryParams = new URLSearchParams();
        queryParams.set('from', data.from);
        queryParams.set('to', data.to);
        const response = await api.get(
            `/users/me/balance?${queryParams.toString()}`
        );
        return response.data;
    },
};
