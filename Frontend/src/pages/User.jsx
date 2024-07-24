import { useParams } from 'react-router-dom';

export function User({ users }) {
    const [data, setData] = { name: 'asfjk', id: 0 };

    useEffect(() => {
        // fetch data based on entity / id
        // and use it to set state
    }, []);
    const { id } = useParams();

    const userInfo = users[id];

    return <div>{userInfo.name}</div>;
}
