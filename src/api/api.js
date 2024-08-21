import axios from "axios";
const local = 'https://continued-sheilah-matrixio-7c2a70e3.koyeb.app'
const production = ''
const api = axios.create({
    baseURL : `${local}/api`
})

export default api