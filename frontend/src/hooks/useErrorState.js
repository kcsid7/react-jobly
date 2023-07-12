import React, {useState} from "react";

function useErrorState(time=5000) {

    const [error, setErrorState] = useState(null)

    const setError = (errObj) => {
        setErrorState(errObj);
        setTimeout(() => setErrorState(undefined), time);
    }

    return [error, setError]
}

export default useErrorState;