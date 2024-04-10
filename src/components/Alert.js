import React, { useContext } from 'react'
import AlertContext from '../context/AlertContext'

const Alert = () => {
    const {alert,alertCapitalize} = useContext(AlertContext);
    return (
        <div>
            {alert && (
                <div className={`alert alert-${alert.type} col-md-5 mx-3`} role="alert">
                    <strong>{alertCapitalize(alert.type)}</strong>: {alert.msg}
                </div>
            )}
        </div>
    )
}

export default Alert
