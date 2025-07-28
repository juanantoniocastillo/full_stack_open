import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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
)

export default {getAll, addPerson, deletePerson}