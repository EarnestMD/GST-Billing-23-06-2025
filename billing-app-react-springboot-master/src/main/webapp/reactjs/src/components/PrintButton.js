import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

const PrintButton = () => {
    const handlePrint = () => {
        // This triggers the browser's print dialog
        window.print();
    };

    return (
        <Button size="sm" variant="info" onClick={handlePrint} className="mr-2">
            <FontAwesomeIcon icon={faPrint} /> Print
        </Button>
    );
};

export default PrintButton;