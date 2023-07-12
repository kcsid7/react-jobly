import React, {useState, useEffect} from "react";

import "./AlertBanner.css";

function AlertBanner({width=100, message, type=null, time=5000, useTimer=false}) {
    
    const [display, setDisplay] = useState(true);

    useEffect( () => {
        if (useTimer) {
            setTimeout(() => {
                setDisplay(false);
            }, time)
        }
    }, [])
        
    return (
        message && display ?
        <>
        <div className={`AlertBanner ${type}`} style={{width: `${width}%`}}>
            <p className="AlertBanner-Message">{message}</p>
        </div>
        </>
        : <></>
    )

}

export default AlertBanner;