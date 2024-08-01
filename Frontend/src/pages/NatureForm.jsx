import { useEffect, useState } from 'react';

function simulateNetwork() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const myObject = {
                key1: 'value1',
                key2: 'value2',
            };
            resolve(myObject);
        }, 1000);
    });
}

function printChanges(data) {
    console.log(data);
}

export function NatureForm({
    getData = simulateNetwork,
    submitChanges = printChanges,
}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        // TODO get the initial values from the DB here
        // when this is done we can get rid of temp and replace it with {} for default state

        getData().then((r) => setData(r)); // replace this
    }, []);

    function updateData(field, newValue) {
        setData((s) => {
            s[field] = newValue;
            return s;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // TODO make request to backend here
        submitChanges(data);

        // possibly redirect to another page? we can make this a prop too, if we want to :)
    }

    if (!data) return <div>Loading Form...</div>;
    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(data).map(([field, value]) => (
                <NatureInput
                    key={field}
                    field={field}
                    initialValue={value}
                    updateData={updateData}
                />
            ))}
            <input type='submit' value='Submit' />
        </form>
    );
}

function NatureInput({ field, initialValue, updateData }) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        const newValue = e.target.value;
        setValue(newValue);
        updateData(field, newValue);
    }

    return (
        <div>
            <label htmlFor={field}>{field}: </label>
            <input id={field} value={value} onChange={handleChange} />
        </div>
    );
}
