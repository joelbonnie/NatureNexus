import { Link } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <div>
            <h1>NatureNexus</h1>
            <br></br>
            <Link to={'/animal'} relative='path'>
                Animals
            </Link>
            <br></br>
            <Link to={'/plant'} relative='path'>
                Plants
            </Link>
            <br></br>
            <Link to={'/habitat'} relative='path'>
                Habitats
            </Link>
            <br></br>
            <Link to={'/ranger'} relative='path'>
                Rangers
            </Link>
            <br></br>
            <Link to={'/equipment'} relative='path'>
                Equipment
            </Link>
            <br></br>
            <Link to={'/facility'} relative='path'>
                Facilities
            </Link>
            <br></br>
            <Link to={'/visitor'} relative='path'>
                Visitors
            </Link>
        </div>
    );
}
export default App;
