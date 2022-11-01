import "../css.css";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getID } from "../http/API_flat";
import FlatCard from "../component/FlatCard";


const Flat = () => {
    const {id} = useParams()
    const [flat, setFlat] = useState(undefined)
    useEffect(()=>{
        getID(id).then(data => setFlat(data))
    }, [])
        return (
            <FlatCard data={flat} flatOne={true}/>
        );
};

export default Flat;