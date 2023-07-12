import React, {useState, useEffect} from "react";


function useLocalStorage(key, value=null) {
    const initialVal = localStorage.getItem(key) || value;

    const [item, setItem] = useState(initialVal);

    useEffect(function setKeyItem() {
        if (item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];

}

export default useLocalStorage;