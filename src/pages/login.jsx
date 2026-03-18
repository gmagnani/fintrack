import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';

const loginSchema = z.object({
    email: z
        .string()
        .email({
            message: 'O email é inválido',
        })
        .trim()
        .min(1, {
            message: 'O email é obrigatório',
        }),
    password: z.string().trim().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    }),
});

const LoginPage = () => {
    const [user, setUser] = useState(null);
    const loginMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data) => {
            const response = await api.post('/users/login', {
                email: data.email,
                password: data.password,
            });
            return response.data;
        },
    });
    const methodes = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
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
                console.log(response.data);
            } catch (error) {
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshToken');
                console.log(error);
            }
        };
        init();
    }, []);

    const handleSubmit = (data) => {
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

    if (user) return <h1>Usuário {user.first_name} logado com sucesso!</h1>;

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
            <Form {...methodes}>
                <form onSubmit={methodes.handleSubmit(handleSubmit)}>
                    <Card className="w-[500px]">
                        <CardHeader className="text-center">
                            <CardTitle>Entre com sua conta</CardTitle>
                            <CardDescription>
                                Insira seus dados abaixo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={methodes.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Digite seu email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methodes.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Digite sua senha"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Entrar</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <div className="flex items-center justify-center">
                <p className="text-center opacity-50">Não possui uma conta?</p>
                <Button variant="link" asChild>
                    <Link to="/signup" className="text-white">
                        Faça signup!
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
