import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = newObj => axios.post(baseUrl, newObj)

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default {
    getAll,
    create,
    update,
    remove
}