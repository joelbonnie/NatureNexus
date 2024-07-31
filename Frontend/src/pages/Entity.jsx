import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Entity() {
    const { entityName, id } = useParams();

    const [currentEntity, setCurrentEntity] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/entity/${entityName}/${id}`)
            .then((response) => response.json())
            .then((data) => setCurrentEntity(data[0]));
    }, []);
    console.log(currentEntity);
    return Object.entries(currentEntity).map((e) => (
        <div key={e[0] + '_' + String(e[1])}>
            {e[0]}: {e[1]}
        </div>
    ));
}
