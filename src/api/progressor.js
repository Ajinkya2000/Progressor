import axios from 'axios'

export default axios.create({
    baseURL: 'https://serene-reaches-13440.herokuapp.com/api/'
})