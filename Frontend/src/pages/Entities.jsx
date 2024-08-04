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
            .then((response) => response.json())
            .then((data) => setCurrentEntities(data));
    }

    return (
        <div>
            <div>
                <Link to={`../${entityName}/addEntity`} relative='path'>
                    <button>Add new {entityName}</button>
                </Link>
            </div>

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
                            to={`../${entityName}/${encodeURIComponent(entityId)}`}
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
