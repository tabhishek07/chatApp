import React, {createContext, useState, useContext} from "react";

// create user context

export const UserContext = createContext();

// Create provider component

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return(
        <UserContext.Provider value={ { user, setUser }} >
            {children}
        </UserContext.Provider>
    );
};
