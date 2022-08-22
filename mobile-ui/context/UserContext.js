import React, { createContext, useState } from 'react'

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const addUser = (user) => setUser(user);

    const removeUser = () => setUser(null);

    const value = {
        user,
        addUser,
        removeUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
