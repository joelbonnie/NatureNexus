import { Link } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <div>
            <h1>NatureNexus</h1>

            <div>
                <Link to={'/animal'} relative='path'>
                    Animals
                </Link>
            </div>

            <div>
                <Link to={'/plant'} relative='path'>
                    Plants
                </Link>
            </div>

            <div>
                <Link to={'/habitat'} relative='path'>
                    Habitats
                </Link>
            </div>

            <div>
                <Link to={'/ranger'} relative='path'>
                    Rangers
                </Link>
            </div>

            <div>
                <Link to={'/equipment'} relative='path'>
                    Equipment
                </Link>
            </div>

            <div>
                <Link to={'/facility'} relative='path'>
                    Facilities
                </Link>
            </div>

            <div>
                <Link to={'/visitor'} relative='path'>
                    Visitors
                </Link>
            </div>
        </div>
    );
}
export default App;
