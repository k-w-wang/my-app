import React from 'react';

const ErrorBoundary = () => {
    return (
        <div>
            <h1>Something went wrong!</h1>
            <p>Please try again later.</p>
            <button onClick={() =>
                window.history.back()
            }>back</button>
        </div>
    );
};

export default ErrorBoundary; 