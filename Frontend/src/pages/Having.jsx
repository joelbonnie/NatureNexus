import { useEffect, useState } from 'react';

export function Having() {
    const [havingData, setHavingData] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/statistics/animalSpecies`
        )
            .then((response) => response.json())
            .then((data) => setHavingData(data));
    }, []);

    return (
        <div>
            <h3> Species that have more than one animal in the park! </h3>
            {havingData.map((v) => (
                <div key={v['SPECIESNAME']}>
                    {v['SPECIESNAME']}: {v['COUNT(*)']}
                </div>
            ))}
        </div>
    );
}
