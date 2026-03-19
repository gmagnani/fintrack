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
};
