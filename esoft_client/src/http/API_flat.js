import { $host } from ".";

export const getID = async (id) => {
    const {data} = await $host.get('/flat/'+id)
    return data
}

export const getAll = async (filter, limit, page) => {
    const {data} = await $host.post('/flat', {filter, limit, page})
    console.log(data)
    return data
}
