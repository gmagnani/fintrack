import { Navigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth';

const HomePage = () => {
    const { user, isInitializing, logout } = useAuthContext();

    if (isInitializing) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Home Page</h1>
            <p>Usuário {user.firstName} logado com sucesso!</p>
            <Button onClick={logout}>Sair</Button>
        </div>
    );
};

export default HomePage;
