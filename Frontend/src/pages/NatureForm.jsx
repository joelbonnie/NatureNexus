import { useEffect, useState } from 'react';

export function NatureForm({ getData, submitChanges, isCheckbox = false }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData().then((r) => setData(r));
    }, []);

    function updateData(field, newValue) {
        setData((s) => {
            s[field] = newValue;
            return s;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        submitChanges(data);
    }

    if (!data) {
        console.log('loading');
        return <div>Loading Form...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(data).map(([field, value]) =>
                isCheckbox ? (
                    <FormCheckbox
                        key={field}
                        field={field}
                        initialValue={value}
                        updateData={updateData}
                    />
                ) : (
                    <NatureInput
                        key={field}
                        field={field}
                        initialValue={value}
                        updateData={updateData}
                    />
                )
            )}
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

function FormCheckbox({ field, initialValue, updateData }) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        const newValue = e.target.checked;
        setValue(newValue);
        updateData(field, newValue);
    }
    return (
        <div>
            <label htmlFor={field}>{field}: </label>
            <input
                type='checkbox'
                id={field}
                name={field}
                value={value}
                onChange={handleChange}
            ></input>
        </div>
    );
}
