import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const reFetch = async () => {
        fetchData();
    };

    return { data, loading, error, reFetch };
};

export default useFetch;