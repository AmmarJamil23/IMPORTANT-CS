import { useConnection } from "../../context/ConnectionContext";

function ConnectionStatus() {
    const { connectionStatus } = useConnection();

    const color = 
    connectionStatus === "connected"
    ? "text-green-400"
    : connectionStatus === "connecting"
     ? "text-yellow-400"
     : "text-red-400"


    return (
        <p className={`text-sm ${color}`}>
            Status: {connectionStatus}
        </p>
    )
}

export default ConnectionStatus;