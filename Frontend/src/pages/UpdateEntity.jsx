import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NatureForm } from './NatureForm';

export function UpdateEntity() {
    const { entityName, id } = useParams();
    const [currentEntity, setCurrentEntity] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    function getEntityData() {
        console.log('fetching');
        const response = fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/${id}?attributes=all`
        )
            .then(handleResponse)
            .then((r) => {
                const obj = r[0];
                for (const key in obj) {
                    if (!obj[key]) obj[key] = ''; // set null to ''
                    if (obj[key].trim) obj[key] = obj[key].trim(); // remove whitespace at end
                    if (key === 'LASTSEEN' || key.includes('DATE')) {
                        obj[key] = obj[key].split('T')[0];
                    }
                }
                console.log(obj);
                return Promise.resolve(obj);
            });
        return response;
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

    function handleSubmit(data) {
        console.log(data);

        const response = fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/${id}/update`,
            {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    return (
        <>
            <NatureForm getData={getEntityData} submitChanges={handleSubmit} />
        </>
    );
}
