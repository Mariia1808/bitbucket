import axios from "axios";
import { $host } from ".";

export const getID = async (id) => {
    const {data} = await $host.get('/flat/'+id)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('/flat')
    return data
}
