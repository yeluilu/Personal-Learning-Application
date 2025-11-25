import { useEffect, useState } from "react";

function UsersPage() {
    const savedToken = localStorage.getItem("authToken");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch("http://127.0.0.1:8000/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${savedToken}`
                    }
                });

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        }

        if (savedToken) {
            getUser();
        }

    }, [savedToken]);

    return (
        <div className="container">
            <h1 className="UserFirstName">
                {userData ? `Hello ${userData.username}` : "No user found"}
            </h1>

            {userData && (
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            )}
        </div>
    );
}

export default UsersPage;