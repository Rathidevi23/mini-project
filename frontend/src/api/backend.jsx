import axios from 'axios';

const token=localStorage.getItem('usertoken')

export default axios.create({
    baseURL:'http://localhost:5000',
})