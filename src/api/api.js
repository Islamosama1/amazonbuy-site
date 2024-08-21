import axios from "axios";
const local = 'https://amazonbuy-web-production.up.railway.app'
const production = ''
const api = axios.create({
    baseURL : `${local}/api`
})

export default api