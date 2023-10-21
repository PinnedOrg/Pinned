import React, {useState} from 'react';
import UserDropdown from "./UserDropdown";
import data from ".//utils/users.json";

const Home = () => {
    const [selectedUser, setSelectedUser] = useState("");

    return (
        <div>
            <h1>Home</h1>
            <p>Home page</p>
            <UserDropdown
                users={data.Users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
        </div>
    )
}

export default Home;