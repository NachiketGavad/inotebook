import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {

    // alert object
    const [alert, setAlert] = useState(null);

    const alertCapitalize = (word) => {
        if(word=='danger'){
            word='error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        // console.log(alert);
        // remove alert automatically
        setTimeout(() => {
            setAlert(null);
        }, 1500);
        // console.log(alert);
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert, alertCapitalize }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState
