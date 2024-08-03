import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UNIQUE_ID_NAMES = {
    HABITAT: 'HABITATNAME',
    PARKRANGER: 'RANGERID',
    FACILITY: 'FACILITYNAME',
    RABBIT: 'ANIMALID',
    FROG: 'ANIMALID',
    WOLF: 'ANIMALID',
    OWL: 'ANIMALID',
    MOM: 'animalId_Mom',
    DAD: 'animalId_Dad',
    FOREST: 'HABITATNAME',
    POND: 'HABITATNAME',
    SPECIES: 'SPECIESNAME',
    FAMILY: 'taxonomicalFamily',
    // TODO: id names are not correct for:
    // area, livesin, manages, monitors, plantedby, visitor
};

export function Entities() {
    const { entityName } = useParams();

    const [currentEntities, setCurrentEntities] = useState([]);
    const [filterInput, setFilterInput] = useState('');

    const handleFilterInput = (e) => {
        setFilterInput(e.target.value);
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

    function submitFilter(e) {
        e.preventDefault();

        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}?filter=${filterInput}`
        )
            .then((response) => response.json())
            .then((data) => setCurrentEntities(data));
    }

    return (
        <div>
            <div>
                <form onSubmit={submitFilter}>
                    <input
                        type='text'
                        placeholder='WHERE clause'
                        onChange={handleFilterInput}
                        value={filterInput}
                    ></input>
                    <input type='submit' value='Filter'></input>
                </form>
            </div>

            <div>
                {currentEntities.map((e) => (
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
