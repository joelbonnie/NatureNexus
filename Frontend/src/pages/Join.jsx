import { useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

export function Join() {
    const [currentAnimals, setCurrentAnimals] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFilterInput = (e) => {
        console.log(e);
        setFilterInput(e.target.value);
    };

    function submitFilter(e) {
        e.preventDefault();

        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/statistics/habitatMembers/${filterInput}`
        )
            .then(handleResponse)
            .then((data) => setCurrentAnimals(data))
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
        console.log(response);
        return response.json();
    }

    return (
        <div>
            <h3>Discover the animals calling this habitat home! :D</h3>

            <ErrorMessage errorMessage={errorMessage}></ErrorMessage>

            <div style={{ padding: '20px' }}>
                <form onSubmit={submitFilter}>
                    <input
                        type='text'
                        placeholder='Habitat Name:'
                        onChange={handleFilterInput}
                        value={filterInput}
                    ></input>
                    <input type='submit' value='Find!'></input>
                </form>
            </div>

            <div>
                <h4> Animal ID: Animal Name </h4>
            </div>

            <div>
                {currentAnimals.map((e) => (
                    <div key={e['ANIMALID']}>
                        {e['ANIMALID']} : {e['ANIMALNAME']}{' '}
                    </div>
                ))}
            </div>
        </div>
    );
}
