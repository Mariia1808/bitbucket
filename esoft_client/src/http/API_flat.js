import axios from "axios";
import { $host } from ".";

export const getID = async (id) => {
    const {data} = await $host.get('/flat/'+id)
    console.log(data)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('/flat')
    console.log(data)
    return data
}
