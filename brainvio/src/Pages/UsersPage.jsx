import { useLocation } from "react-router-dom";

function UsersPage(){
    const location = useLocation();
    const { user } = location.state || {};  // user is what was passed

    return(
        <div className = "container">
            <h1 className = "UserFirstName">{user ? `Hello ${user.FirstName}` : "No user found"}</h1>
        </div>
    );
}

export default UsersPage;