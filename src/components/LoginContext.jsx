import React, { createContext, useContext, useState } from "react";


const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({})
    const [isLogedin, setIsLogedin] = useState(null)
    const [loginAs, setLoginAs] = useState("")
    const [doctor, setDoctor] = useState([])
    const [userAfterLogin, setUserAfterLogin] = useState({})
    const [selectedPatient, setSelectedPatient] = useState({});
    const [selectedDoctor, setselectedDoctor] = useState({});

    return (
        <LoginContext.Provider value={{ selectedDoctor, setselectedDoctor, selectedPatient, setSelectedPatient, userAfterLogin, setUserAfterLogin, doctor, setDoctor, setLoginData, loginData, isLogedin, setIsLogedin, loginAs, setLoginAs }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

