


import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useFetch(api) {

    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(api).then(({ data }) => {
            setData(data.data);
        })
    }, [])


    return data
}
