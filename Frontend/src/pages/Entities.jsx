import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Entities() {
    const { entityName } = useParams();

    const [currentEntites, setCurrentEntities] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        fetch(`http://localhost:3000/${entityName}`)
            .then((response) => response.json())
            .then((data) => setCurrentEntities(data));
    }, []);

    const searchedEntities = (searchInput) => {
        return (
            currentEntites
                // the first filter is required for now because mock data contains different types of entities together
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
                        to={`../${entityName}/${e.id}`}
                        relative='path'
                        key={entityName + '_' + String(e.id)}
                    >
                        <EntityListing entity={e} entityName={entityName} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function EntityListing({ entity, entityName }) {
    return (
        <h3>
            {entityName} {entity.id}
        </h3>
    );
}
