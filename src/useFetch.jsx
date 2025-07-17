import { useEffect, useState } from "react";

const  useFetch = (url,initialData) =>{
    const [data,setData] = useState(initialData);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setError(null);

        fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            setData(data);
            setError(null)
        })
        .catch((error)=>setError(error.message))
        .finally(()=>setLoading(false))
    },[url])

    return {data,loading,error};
}

export default useFetch;