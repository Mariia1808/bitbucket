import axios from 'axios'

const $host = axios.create({
    baseURL: 'https://vast-tundra-19403.herokuapp.com/api'
})
export {
    $host,
}