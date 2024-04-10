import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {

    // alert object
    const [alert, setAlert] = useState(null);

    const alertCapitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    const showAlert = (message, type) => {
        console.log('alert');
        setAlert({
            msg: message,
            type: type
        })
        // remove alert automatically
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert, alertCapitalize }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState
