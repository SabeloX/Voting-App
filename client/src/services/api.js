import axios from 'axios'

const host = "http://localhost:2000/api"

const setToken = async (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Xero ${token}`
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
}

const call = async (method, path, data) =>{
    const response = await axios[method](`${host}/${path}`, data)
    return response.data
}

export default { call, setToken }