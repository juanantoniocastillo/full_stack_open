import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => (
    axios
        .get(baseUrl)
        .then(response => response.data)
)

const addPerson = newPerson => (
    axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
)

const deletePerson = (id) => (
    axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
)

const updatePerson = (id, newObject) => (
    axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
)

export default {getAll, addPerson, deletePerson, updatePerson}