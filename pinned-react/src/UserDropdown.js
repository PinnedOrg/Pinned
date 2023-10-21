import Form from 'react-bootstrap/Form'

const UserDropdown = ({users, selectedUser, setSelectedUser}) => {
    return (
        <div className="m-5">
            <Form.Control as="select" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </Form.Control>
            {/*You need to be more specific as to what 'User Profile Dropdown UI' means.*/}
        </div>
    )
}

export default UserDropdown;