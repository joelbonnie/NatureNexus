import { Link } from 'react-router-dom';

export function Statistics() {
    /*
    Aggregation + GroupBy
    Find the number of animals of each health category
    SELECT HEALTH, COUNT(ANIMALID) FROM ANIMAL GROUP BY HEALTH;
    */

    /*
    Aggregation + GroupBy
    Find the number of animals in each habitat
    SELECT COUNT(A.animalid), H.habitatname FROM 
    ANIMAL A,LIVESIN L,HABITAT H where A.animalid = L.animalid AND 
    H.habitatname = L.habitatname GROUP BY H.habitatname;
    */

    /*
    Aggregation + Having
    Find species that have more than one animal in the park!
    SELECT SPECIESNAME, COUNT(*) FROM ANIMAL GROUP BY SPECIESNAME HAVING COUNT(*) > 1;
    */

    /*
    Nested Aggregation + Group By
    Find average number of animals in a habitat!
    counts <- select count(animal.id) from Animal group by habitat.id
    select max(count) from select count(animal.id) from Animal group by habitat.id

    SELECT CEIL(AVG(ANIMALCOUNT)) FROM (SELECT COUNT(A.animalid) AS ANIMALCOUNT, H.habitatname HABITAT_NAME FROM
    ANIMAL A,LIVESIN L,HABITAT H where A.animalid = L.animalid AND
    H.habitatname = L.habitatname GROUP BY H.habitatname);
    */

    /*
    Division
    find the habitats where all the animals
    are in poor or moderate health

    Find the plant species that have a plant record of poor health
    SELECT DISTINCT P.species
    FROM Plant P
    WHERE NOT EXISTS
    ((SELECT DISTINCT 'poor' FROM Plant P2)
    MINUS
    (SELECT trim(P1.health)
    FROM Plant P1
    WHERE P.species=P1.species));


    */

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
