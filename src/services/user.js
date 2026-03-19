import { api } from '@/lib/axios';

export const UserService = {
    signup: async (data) => {
        const response = await api.post('/users', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        });
        return response.data;
    },
    login: async (data) => {
        const response = await api.post('/users/login', {
            email: data.email,
            password: data.password,
        });
        return response.data;
    },
    me: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },
};
