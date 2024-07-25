import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Entities({ mockEntities }) {
    const { entity } = useParams();

    const [currentEntites, setCurrentEntities] = useState({});

    // const { entities } = useParams();

    useEffect(() => {
        // fetch all of the current entity data from the specified entity table, `entity`.
        // and use setCurrentEntities() and the returned data to set state.
        // for now, mock data is passed in and used.
    }, []);

    return (
        <div>
            {mockEntities
                // filtering is required for now because mock data contains different types of entities together
                .filter((e) => e.entity.includes(entity))
                .map((e) => (
                    <Link to={`../${e.entity}/${e.id}`} relative='path'>
                        <Entity entity={e} />
                    </Link>
                ))}
        </div>
    );
}

function Entity({ entity }) {
    return (
        <div>
            <h3>
                {entity.entity} {entity.id}
            </h3>
        </div>
    );
}
