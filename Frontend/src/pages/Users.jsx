import { useEffect } from 'react';

export function Users({ users }) {
    return (
        <div>
            {users.map((u) => (
                <User user={u} key={u.id} />
            ))}
        </div>
    );
}

function User({ user }) {
    return <div>{user.name}</div>;
}
