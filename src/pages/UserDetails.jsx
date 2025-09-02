import { useParams } from "react-router-dom";

export default function UserDetails() {
    const { id } = useParams();

    return <h2>User Details Page - User {id}</h2>;
}