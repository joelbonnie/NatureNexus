import { useEffect, useState } from 'react';

export function Division() {
    const [divisonData, setDivisonData] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/statistics/plantSpecies`
        )
            .then((response) => response.json())
            .then((data) => setDivisonData(data));
    }, []);

    return (
        <div>
            <h3>
                The plant species that have at least one instance of a plant in
                poor health:
            </h3>
            {divisonData.map((v) => (
                <div key={v['SPECIES']}>{v['SPECIES']}</div>
            ))}
        </div>
    );
}
