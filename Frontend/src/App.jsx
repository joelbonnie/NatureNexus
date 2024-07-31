import { Link } from 'react-router-dom';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/tables')
            .then((response) => response.json())
            .then((data) => setTables(data));
    }, []);

    return (
        <div>
            <h1>NatureNexus</h1>

            {tables.map((t) => (
                <div key={t}>
                    <Link to={`/${t}`} relative='path'>
                        {t}
                    </Link>
                </div>
            ))}
        </div>
    );
}
export default App;
