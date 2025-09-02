import { useNavigate } from "react-router-dom";

export default function Users() {
    const users = ["User-1", "User-2", "User-3", "User-4", "User-5"];
    const navigate = useNavigate();

    const handleLogin = (userId) => {
        navigate(`/user/${userId}`);
    };

    return (
        <>
            <h2 className="my-6 p-4 bg-red-600">Users List</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user}{" "}
                        <button onClick={() => handleLogin(index + 1)}>Login</button>
                    </li>
                ))}
            </ul>
        </>
    )
}