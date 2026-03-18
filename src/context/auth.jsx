import { useMutation } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/lib/axios';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    signup: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data) => {
            const response = await api.post('/users', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });
            return response.data;
        },
    });
    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data) => {
            const response = await api.post('/users/login', {
                email: data.email,
                password: data.password,
            });
            return response.data;
        },
    });

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = localStorage.getItem('accesstoken');
                const refreshToken = localStorage.getItem('refreshToken');
                if (!accessToken && !refreshToken) return;
                const response = await api.get('/users/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshToken');
                console.log(error);
            }
        };
        init();
    }, []);

    const signup = (data) => {
        signupMutation.mutate(data, {
            onSuccess: (createdUser) => {
                const accessToken = createdUser.tokens.accessToken;
                const refreshToken = createdUser.tokens.refreshToken;
                setUser(createdUser);
                localStorage.setItem('accesstoken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                toast.success('Usuário criado com sucesso!');
            },
            onError: () => {
                toast.error('Erro ao criar usuário!');
            },
        });
    };

    const login = (data) => {
        loginMutation.mutate(data, {
            onSuccess: (loggedUser) => {
                const accessToken = loggedUser.tokens.accessToken;
                const refreshToken = loggedUser.tokens.refreshToken;
                setUser(loggedUser);
                localStorage.setItem('accesstoken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                toast.success('Usuário logado com sucesso!');
            },
            onError: () => {
                toast.error('Erro ao fazer login!');
            },
        });
    };
    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login,
                signup: signup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
