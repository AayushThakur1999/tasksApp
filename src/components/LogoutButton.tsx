import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
    const { handleLogout } = useAuth();

    return (
        <button onClick={handleLogout} id="logout-btn">
            Logout
        </button>
    );
};

export default LogoutButton;