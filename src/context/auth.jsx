import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/lib/axios';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    signup: () => {},
});

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refreshToken';

const setTokens = (tokens) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

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
                const accessToken = localStorage.getItem(
                    LOCAL_STORAGE_ACCESS_TOKEN_KEY
                );
                const refreshToken = localStorage.getItem(
                    LOCAL_STORAGE_REFRESH_TOKEN_KEY
                );
                if (!accessToken && !refreshToken) return;
                const response = await api.get('/users/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                removeTokens();
                console.log(error);
            }
        };
        init();
    }, []);

    const signup = (data) => {
        signupMutation.mutate(data, {
            onSuccess: (createdUser) => {
                setUser(createdUser);
                setTokens(createdUser.tokens);
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
                setUser(loggedUser);
                setTokens(loggedUser.tokens);
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

export const useAuthContext = () => useContext(AuthContext);
