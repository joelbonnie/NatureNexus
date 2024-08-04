import { NatureForm } from './NatureForm';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export function AddEntity() {
    const { entityName } = useParams();
    const [data, setData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    console.log('entity name', entityName);

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
                        acc[curr.COLUMN_NAME] = '';
                        return acc;
                    }, {})
                )
            );
        console.log('response', response);
        return response;
    }

    function submit(formData) {
        console.log('form data', formData);
        setData(formData);

        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/insert`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                console.log(response);
                setSubmitted(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div>
                <NatureForm
                    getData={getAttributes}
                    submitChanges={submit}
                    isCheckbox={false}
                ></NatureForm>
            </div>
            <div>
                {submitted ? (
                    <h4>
                        Successfully Submitted! Refresh to submit another entry.
                    </h4>
                ) : (
                    <h4></h4>
                )}
            </div>
        </div>
    );
}
