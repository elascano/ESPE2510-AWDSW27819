//custom hook useFetch.js
import { useEffect, useState } from "react";

export function useFetch(url) {
    //ESTADOS
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //creacion del useEffect para hacer la peticion/llamdo a fetch
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError("error"))
            .finally(() => setLoading(false));

    }, [url]);

    return {data, loading, error};
}