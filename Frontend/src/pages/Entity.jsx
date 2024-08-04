import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NatureForm } from './NatureForm';

export function Entity() {
    const { entityName, id } = useParams();
    const [currentEntity, setCurrentEntity] = useState({});

    console.log('current entity', currentEntity);

    function getAttributes() {
        const response = fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/attributeNames`
        )
            .then((response) => response.json())
            .then((data) =>
                Promise.resolve(
                    data.reduce((acc, curr) => {
                        acc[curr.COLUMN_NAME] = false;
                        return acc;
                    }, {})
                )
            );
        return response;
    }

    function submitChanges(formData) {
        const wantedAttributes = Object.entries(formData)
            .filter(([attr, isSelected]) => isSelected)
            .map(([attr, isSelected]) => attr);

        console.log('wanted attrs', wantedAttributes);

        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/${id}?attributes=${wantedAttributes}`
        )
            .then((response) => response.json())
            .then((data) => setCurrentEntity(data[0]));

        console.log(currentEntity);
    }

    return (
        <div>
            <div>
                <NatureForm
                    getData={getAttributes}
                    submitChanges={submitChanges}
                    isCheckbox={true}
                />
            </div>

            <div>{Object.entries(currentEntity).map((a) => attribute(a))}</div>
        </div>
    );
}

function attribute(a) {
    return (
        <div key={a[0] + '_' + String(a[1])}>
            {a[0]}: {a[1]}
        </div>
    );
}
