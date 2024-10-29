import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, toggleIsAuth] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    isAuth: false,
    user : {
      username: '',
      email: '',
      password: ''
    }
  });

  async function login(token) {
    localStorage.setItem('token', token)

    const decodedToken = jwtDecode(token);
    console.log(decodedToken.sub);

    try {
      const response = await axios.get(`https://localhost:3000/600/users/${decodedToken}`);

      setAuth({
        isAuth: true,
        user: {
          username: 'Test',
          email: ''
        }});
    } catch (e) {
      console.log(e)
    }

    console.log('Gebruiker is ingelogd!');
    toggleIsAuth(true);
    navigate('/profile');
  }

  function logout() {
    console.log('Gebruiker is uitgelogd!');
    toggleIsAuth(false);
    navigate('/');
  }

  const contextData = {
    isAuth: isAuth,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;