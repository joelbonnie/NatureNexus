import { NatureForm } from './NatureForm';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

const SUBMITTED = 'submitted';

export function AddEntity() {
    const { entityName } = useParams();
    const [submitState, setSubmitState] = useState('');

    function getAttributes() {
        const response = fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/entity/${entityName}/attributeNames`
        )
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    return response.json().then((error) => {
                        const errorMessage =
                            error.code || 'Something went wrong';
                        setSubmitState(errorMessage);
                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            })
            .then((data) =>
                Promise.resolve(
                    data.reduce((acc, curr) => {
                        acc[curr.COLUMN_NAME] = '';
                        return acc;
                    }, {})
                )
            )
            .catch((error) => console.log(error.message));
        return response;
    }

    function submit(formData) {
        console.log('form data', formData);

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
                if (!response.ok) {
                    console.log(response);
                    return response.json().then((error) => {
                        const errorMessage =
                            error.code || 'Something went wrong';
                        setSubmitState(errorMessage);
                        throw new Error(errorMessage);
                    });
                }
                setSubmitState(SUBMITTED);
            })
            .catch((error) => {
                // This catch block will only catch errors thrown within the .then() block
                console.log(error.message);
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
                {submitState === SUBMITTED ? (
                    <h4>
                        Successfully submitted! Refresh to submit another entry.
                    </h4>
                ) : (
                    <ErrorMessage errorMessage={submitState}></ErrorMessage>
                )}
            </div>
        </div>
    );
}
