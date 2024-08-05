import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NatureForm } from './NatureForm';
import { ErrorMessage } from './ErrorMessage';

export function Entity() {
    const { entityName, id } = useParams();
    const [currentEntity, setCurrentEntity] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    console.log('current entity', currentEntity);

    function getAttributes() {
        const response = fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/attributeNames`
        )
            .then(handleResponse)
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
            .then(handleResponse)
            .then((data) => setCurrentEntity(data[0]));

        console.log(currentEntity);
    }

    function deleteEntity() {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/${id}/delete`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        const errorMessage =
                            error.code || 'Something went wrong';
                        setErrorMessage(errorMessage);
                        throw new Error(errorMessage);
                    });
                }
                navigate(`../entity/${entityName}`);
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            });
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
            <ErrorMessage errorMessage={errorMessage}></ErrorMessage>

            <div>
                <button onClick={() => deleteEntity()}>
                    Delete this {entityName} Entry
                </button>
            </div>

            <Link to={`./update`}>
                <button>Update this {entityName} Entry</button>
            </Link>

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
