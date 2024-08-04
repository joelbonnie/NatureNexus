export function ErrorMessage({ errorMessage }) {
    return (
        <div>
            {errorMessage === '' ? (
                <h4></h4>
            ) : (
                <h4>
                    An error occurred: {errorMessage}. Please refresh and try
                    again.
                </h4>
            )}
        </div>
    );
}
