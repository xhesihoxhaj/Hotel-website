import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:3000/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    return (
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
