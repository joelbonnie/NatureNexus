import { Link } from 'react-router-dom';

export function Statistics() {
    return (
        <div>
            <h2>Nature Statistics! :D</h2>

            <div key={'Q1'}>
                <Link to={'/statistics/animalHealth'} relative='path'>
                    {'Find the number of animals of each health category:\n'}
                </Link>
            </div>

            <div key={'Q2'}>
                <Link to={'/statistics/animalSpecies'} relative='path'>
                    {
                        'Find species that have more than one animal in the park:\n'
                    }
                </Link>
            </div>

            <div key={'Q3'}>
                <Link to={'/statistics/avgHabitat'} relative='path'>
                    {'Find average number of animals in a habitat:\n'}
                </Link>
            </div>

            <div key={'Q4'}>
                <Link to={'/statistics/plantSpecies'} relative='path'>
                    {
                        'Find the plant species that have at least one instance of a plant in poor health:\n'
                    }
                </Link>
            </div>

            <div key={'Q5'}>
                <Link to={'/statistics/habitatMembers'} relative='path'>
                    {'Find the animals that live in a particular habitat:\n'}
                </Link>
            </div>
        </div>
    );
}
