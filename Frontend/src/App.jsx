import { Link } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <div>
            <h1>NatureNexus</h1>

            <div>
                <Link to={'/animals'} relative='path'>
                    Animals
                </Link>
            </div>

            <div>
                <Link to={'/plants'} relative='path'>
                    Plants
                </Link>
            </div>

            <div>
                <Link to={'/habitats'} relative='path'>
                    Habitats
                </Link>
            </div>

            <div>
                <Link to={'/rangers'} relative='path'>
                    Rangers
                </Link>
            </div>

            <div>
                <Link to={'/equipment'} relative='path'>
                    Equipment
                </Link>
            </div>

            <div>
                <Link to={'/facilities'} relative='path'>
                    Facilities
                </Link>
            </div>

            <div>
                <Link to={'/visitors'} relative='path'>
                    Visitors
                </Link>
            </div>
        </div>
    );
}
export default App;
