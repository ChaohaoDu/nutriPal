import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({id: 1});

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{user, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};
