import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Entity({ mockEntities }) {
    const { entity, id } = useParams();

    // const [currentEntity, setCurrentEntity] = useState({});

    useEffect(() => {
        // TODO: fetch data based on `id` and `entity
        // and use setCurrentEntity() and the returned data to set state.
        // for now, mock data is passed in and used.
    }, []);

    const entityInfo = mockEntities.filter((e) => e.entity.includes(entity))[id];

    return (
        Object.entries(entityInfo).map((e) => (
            <div>{e[0]}: {e[1]}</div>
        ))
    );
}
