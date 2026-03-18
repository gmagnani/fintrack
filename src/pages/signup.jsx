import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
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

const signupSchema = z
    .object({
        firstName: z.string().trim().min(1, {
            message: 'O nome é obrigatório',
        }),
        lastName: z.string().trim().min(1, {
            message: 'O sobrenome é obrigatório',
        }),
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
        confirmPassword: z.string().trim().min(6, {
            message: 'A confirmação de senha é obrigatória',
        }),
        terms: z.boolean().refine((value) => value === true, {
            message: 'Você deve aceitar os termos de uso',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As senhas não conferem',
    });

const SignupPage = () => {
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
    const methodes = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const handleSubmit = (data) => {
        signupMutation.mutate(data, {
            onSuccess: (createdUser) => {
                const accessToken = createdUser.token.accessToken;
                const refreshToken = createdUser.token.refreshToken;
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

    if (user) return <h1>Usuário criado com sucesso!</h1>;

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
            <Form {...methodes}>
                <form onSubmit={methodes.handleSubmit(handleSubmit)}>
                    <Card className="w-[500px]">
                        <CardHeader className="text-center">
                            <CardTitle>Crie sua conta</CardTitle>
                            <CardDescription>
                                Insira seus dados abaixo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={methodes.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Digite seu nome"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methodes.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Digite seu sobrenome"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

                            <FormField
                                control={methodes.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirmação de senha
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Confirme sua senha"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methodes.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="items-top flex space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="leading-none">
                                            <label
                                                htmlFor="terms"
                                                className={`text-xs text-muted-foreground opacity-75 ${methodes.formState.errors.terms && 'text-red-500'}`}
                                            >
                                                Ao clicar em “Criar conta”, você
                                                aceita{' '}
                                                <a
                                                    href="#"
                                                    className={`text-white underline ${methodes.formState.errors.terms && 'text-red-500'}`}
                                                >
                                                    nosso termo de uso e
                                                    política de privacidade.
                                                </a>
                                            </label>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Criar Conta</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <div className="flex items-center justify-center">
                <p className="text-center opacity-50">Já possui uma conta?</p>
                <Button variant="link" asChild>
                    <Link to="/login" className="text-white">
                        Faça login!
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default SignupPage;
