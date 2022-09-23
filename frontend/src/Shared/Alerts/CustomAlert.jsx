import React from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorAlert({ variant, children }) {
    return (
        <>
            <Alert variant={variant} style={{ textAlign: "center" }}>
                {children}
            </Alert>
        </>
    );
}

export default ErrorAlert;