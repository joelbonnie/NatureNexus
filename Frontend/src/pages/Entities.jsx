import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UNIQUE_ID_NAMES = {
    HABITAT: 'HABITATNAME',
    PARKRANGER: 'RANGERID',
    FACILITY: 'FACILITYNAME',
};

export function Entities() {
    const { entityName } = useParams();

    const [currentEntites, setCurrentEntities] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT 
            }/entity/${entityName}`
        )
            .then((response) => response.json())
            .then((data) => setCurrentEntities(data));
    }, []);

    const id = (UNIQUE_ID_NAMES[entityName] || `${entityName}id`).toUpperCase();
    console.log(id);

    const searchedEntities = (searchInput) => {
        return (
            currentEntites
                .filter((e) =>
                    Object.entries(e).reduce(
                        (acc, curr) =>
                            String(curr[1])
                                .toLowerCase()
                                .includes(searchInput.toLowerCase()) || acc,
                        false
                    )
                )
        );
    };

    return (
        <div>
            <div>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={handleChange}
                    value={searchInput}
                ></input>
            </div>

            <div>
                {searchedEntities(searchInput).map((e) => (
                    <Link
                        to={`../${entityName}/${e[id]}`}
                        relative='path'
                        key={entityName + '_' + String(e[id])}
                    >
                        <EntityListing
                            entity={e}
                            entityName={entityName}
                            id={id}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function EntityListing({ entity, entityName, id }) {
    return (
        <h3>
            {entityName} {entity[id]}
        </h3>
    );
}