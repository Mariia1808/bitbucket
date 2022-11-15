import "../css.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getID } from "../http/API_flat";
import FlatCard from "../component/FlatCard";
import { CircularProgress } from "@mui/material";

const Flat = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getID(id).then((data) => data.message ? setError(data.message) : setFlat(data)).finally(setLoading(false));
  }, [id]);
  return (
    <>{loading && <CircularProgress/>}
    {error ? <p>{error}</p> : <FlatCard data={flat} flatOne={true} />}</>
  );
};

export default Flat;
