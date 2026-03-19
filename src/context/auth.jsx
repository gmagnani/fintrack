import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';
import { api } from '@/lib/axios';
import { UserService } from '@/services/user';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    signup: () => {},
    logout: () => {},
    isInitializing: true,
});

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
    const [isInitializing, setIsInitializing] = useState(true);
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data) => {
            const respose = await UserService.signup(data);
            return respose;
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
                setIsInitializing(true);
                const accessToken = localStorage.getItem(
                    LOCAL_STORAGE_ACCESS_TOKEN_KEY
                );
                const refreshToken = localStorage.getItem(
                    LOCAL_STORAGE_REFRESH_TOKEN_KEY
                );
                if (!accessToken && !refreshToken) return;
                const response = await api.get('/users/me');
                setUser(response.data);
            } catch (error) {
                setUser(null);
                removeTokens();
                console.log(error);
            } finally {
                setIsInitializing(false);
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

    const logout = () => {
        setUser(null);
        removeTokens();
        toast.success('Usuário deslogado com sucesso!');
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
                logout: logout,
                isInitializing: isInitializing,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
