import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Entities({ mockEntities }) {
    const { entity } = useParams();

    const [currentEntites, setCurrentEntities] = useState(mockEntities);
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        // TODO: fetch all of the current entity data from the specified entity table, `entity`.
        // and use setCurrentEntities() and the returned data to set state.
        // for now, mock data is passed in and used.
    }, []);

    const searchedEntities = (searchInput) => {
        return (
            currentEntites
                // the first filter is required for now because mock data contains different types of entities together
                .filter((e) => e.entity.includes(entity))
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
                        to={`../${e.entity}/${e.id}`}
                        relative='path'
                        key={e.entity + '_' + String(e.id)}
                    >
                        <Entity entity={e} />
                    </Link>
                ))}
            </div>
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
