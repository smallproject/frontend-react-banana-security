import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const storedToken = localStorage.setItem('token');
    const [isAuth, toggleIsAuth] = useState( storedToken || false);

    function setTokenAndStore(token) {
        toggleIsAuth(token);
        localStorage.setItem('token', token);
    }

    const data = {
        isAuth,
        toggleIsAuth
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;