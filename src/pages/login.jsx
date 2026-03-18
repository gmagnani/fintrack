import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
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
import { useAuthContext } from '@/context/auth';

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
    const { login, user } = useAuthContext();

    const methodes = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = (data) => {
        login(data);
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
