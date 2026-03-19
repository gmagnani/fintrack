import { Navigate } from 'react-router';

import Header from '@/components/header';
import { useAuthContext } from '@/context/auth';

const HomePage = () => {
    const { user, isInitializing } = useAuthContext();

    if (isInitializing) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Header />
            <div className="flex items-center justify-between p-4">
                <h2>Dashboard</h2>
                <div></div>
            </div>
        </div>
    );
};

export default HomePage;
