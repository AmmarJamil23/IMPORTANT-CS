import { createContext, useContext, useState } from "react";

const ConnectionContext = createContext(null);

export function ConnectionProvider ({ children }) {
    const [connectionStatus, setConnectionStatus] = useState("connecting");

    return (
        <ConnectionContext.Provider
        value={{ connectionStatus, setConnectionStatus}}
        >
            {children}
        </ConnectionContext.Provider>
    );
}

export function useConnection() {
    return useContext(ConnectionContext);
}