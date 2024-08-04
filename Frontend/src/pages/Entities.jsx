import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ErrorMessage } from './ErrorMessage';

const UNIQUE_ID_NAMES = {
    HABITAT: 'HABITATNAME',
    PARKRANGER: 'RANGERID',
    FACILITY: 'FACILITYNAME',
    RABBIT: 'ANIMALID',
    FROG: 'ANIMALID',
    WOLF: 'ANIMALID',
    OWL: 'ANIMALID',
    MOM: 'ANIMALID_CHILD',
    DAD: 'ANIMALID_CHILD',
    FOREST: 'HABITATNAME',
    POND: 'HABITATNAME',
    SPECIES: 'SPECIESNAME',
    FAMILY: 'TAXONOMICALFAMILY',
    AREA: 'COORDINATES',
    PLANTEDBY: 'PLANTID',
    VISITOR: 'PASSID',
    MANAGES: ['RANGERID', 'FACILITYNAME'],
    LIVESIN: ['ANIMALID', 'HABITATNAME'],
    MONITORS: ['HABITATNAME', 'RANGERID'],
};

export function Entities() {
    const { entityName } = useParams();

    const [currentEntities, setCurrentEntities] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFilterInput = (e) => {
        setFilterInput(e.target.value);
    };

    useEffect(() => {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}`
        )
            .then(handleResponse)
            .then((data) => setCurrentEntities(data))
            .catch((error) => console.log(error.message));
    }, []);

    console.log(currentEntities);
    var id_key = UNIQUE_ID_NAMES[entityName] || `${entityName}id`.toUpperCase();

    function getIdValueOfEntity(entity) {
        var id_value = '';
        if (typeof id_key === 'string') {
            id_value = entity[id_key];
        } else {
            id_value = id_key.map((key) => entity[key]).join('_');
        }
        console.log(id_value);
        return id_value;
    }

    function submitFilter(e) {
        e.preventDefault();

        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}?filter=${filterInput}`
        )
            .then(handleResponse)
            .then((data) => setCurrentEntities(data))
            .catch((error) => console.log(error.message));
    }

    function handleResponse(response) {
        if (!response.ok) {
            return response.json().then((error) => {
                const errorMessage = error.code || 'Something went wrong';
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            });
        }
        return response.json();
    }

    return (
        <div>
            <div>
                <Link to={`../${entityName}/addEntity`} relative='path'>
                    <button>Add new {entityName}</button>
                </Link>
            </div>

            <ErrorMessage errorMessage={errorMessage}></ErrorMessage>

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
                {currentEntities.map((e) => {
                    const entityId = getIdValueOfEntity(e);
                    return (
                        <Link
                            to={`../${entityName}/${encodeURIComponent(
                                entityId
                            )}`}
                            relative='path'
                            key={entityName + '_' + String(entityId)}
                        >
                            <EntityListing
                                entityName={entityName}
                                id={entityId}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function EntityListing({ entityName, id }) {
    return (
        <h3>
            {entityName} {id}
        </h3>
    );
}
