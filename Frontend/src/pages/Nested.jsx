import { useEffect, useState } from 'react';

export function Nested() {
    const [nestedData, setNestedData] = useState({});

    useEffect(() => {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/statistics/avgHabitat`
        )
            .then((response) => response.json())
            .then((data) => setNestedData(data[0]));
    }, []);

    return (
        <div>
            <h3> Find average number of animals in a habitat! </h3>
            <div key={nestedData['SPECIESNAME']}>
                {nestedData['CEIL(AVG(ANIMALCOUNT))']}
            </div>
        </div>
    );
}
