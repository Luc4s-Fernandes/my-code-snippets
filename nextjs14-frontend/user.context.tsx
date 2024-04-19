import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    nome: string,
    idade: string
}

interface UserContextType {
    contextUser: User;
    setContextUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [contextUser, setContextUser] = useState<User>({nome: "Inicial", idade: "0"});
    return (
        <UserContext.Provider value={{ contextUser, setContextUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext deve ser usado dentro de um useUserProvider');
    }
    return context;
}
