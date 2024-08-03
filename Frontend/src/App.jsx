import { Link } from 'react-router-dom';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/tables`)
            // To use the VITE_BACKEND_PORT env variable, create a .env file under the Frontend directory.
            // In it, add: VITE_BACKEND_PORT=...
            // Replace ... with the backend port, which you can find by running your generated local-start.sh file.
            // You'll see "Server running at ...".
            .then((response) => response.json())
            .then((data) => setTables(data));
    }, []);

    return (
        <div>
            <h1>NatureNexus</h1>

            {tables.map((t) => (
                <div key={t}>
                    <Link to={`/entity/${t}`} relative='path'>
                        {t}
                    </Link>
                </div>
            ))}
            <div key={'Statistics'}>
                <Link to={'/statistics'} relative='path'>
                    {'STATISTICS'}
                </Link>
            </div>
        </div>
    );
}
export default App;