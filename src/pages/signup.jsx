import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SignupPage = () => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Crie sua conta</CardTitle>
                    <CardDescription>Insira seus dados abaixo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Digite seu nome" />
                    <Input placeholder="Digite seu sobrenome" />
                    <Input type="email" placeholder="Digite seu email" />
                    <div className="relative">
                        <Input
                            type={passwordIsVisible ? 'text' : 'password'}
                            placeholder="Digite sua senha"
                        />
                        <Button
                            className="absolute bottom-0 right-0 top-0 my-auto mr-1 w-8 text-muted-foreground"
                            variant="ghost"
                            onClick={() =>
                                setPasswordIsVisible((prev) => !prev)
                            }
                        >
                            {passwordIsVisible ? <EyeOff /> : <EyeIcon />}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Criar Conta</Button>
                </CardFooter>
            </Card>
            <div className="flex items-center justify-center">
                <p className="text-center opacity-50">Já possui uma conta?</p>
                <Button variant="link" asChild>
                    <Link to="/login">Faça login!</Link>
                </Button>
            </div>
        </div>
    );
};

export default SignupPage;
