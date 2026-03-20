import { useQuery } from '@tanstack/react-query';
import {
    PiggyBankIcon,
    TrendingDownIcon,
    TrendingUpIcon,
    WalletIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router';

import { useAuthContext } from '@/context/auth';
import { UserService } from '@/services/user';

import BalanceItem from './balance-item';

const Balance = () => {
    const { user } = useAuthContext();
    const [searchParams] = useSearchParams();
    const { data } = useQuery({
        queryKey: ['balance', user.id],
        queryFn: () =>
            UserService.getBalance({
                from: searchParams.get('from'),
                to: searchParams.get('to'),
            }),
    });
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
            <BalanceItem
                icon={<WalletIcon size={20} />}
                title="Saldo"
                value={data?.balance}
            />
            <BalanceItem
                icon={
                    <TrendingUpIcon className="text-primary-green" size={20} />
                }
                title="Ganhos"
                value={data?.earnings}
            />
            <BalanceItem
                icon={
                    <TrendingDownIcon className="text-primary-red" size={20} />
                }
                title="Despesas"
                value={data?.expenses}
            />
            <BalanceItem
                icon={<PiggyBankIcon className="text-primary-blue" size={20} />}
                title="Investimentos"
                value={data?.investments}
            />
        </div>
    );
};

export default Balance;
