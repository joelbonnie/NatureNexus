import { useEffect, useState } from 'react';

export function GroupBy() {
    const [groupByData, setGroupByData] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/statistics/animalHealth`
        )
            .then((response) => response.json())
            .then((data) => setGroupByData(data));
    }, []);

    return (
        <div>
            <h3> Find the number of animals of each health category: </h3>
            {groupByData.map((v) => (
                <div key={v['HEALTH']}>
                    {v['HEALTH']}: {v['COUNT(ANIMALID)']}
                </div>
            ))}
        </div>
    );
}
