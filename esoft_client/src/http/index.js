import axios from 'axios'

const $host = axios.create({
    baseURL: 'http://vast-tundra-19403.herokuapp.com/api'
})
export {
    $host,
}