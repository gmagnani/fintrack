import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

const PasswordInput = ({ placeholder }) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    return (
        <div className="relative">
            <Input
                type={passwordIsVisible ? 'text' : 'password'}
                placeholder={placeholder}
            />
            <Button
                className="absolute bottom-0 right-0 top-0 my-auto mr-1 w-8 text-muted-foreground"
                variant="ghost"
                onClick={() => setPasswordIsVisible((prev) => !prev)}
            >
                {passwordIsVisible ? <EyeOff /> : <EyeIcon />}
            </Button>
        </div>
    );
};

export default PasswordInput;
