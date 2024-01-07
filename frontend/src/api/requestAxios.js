import axios from 'axios'

const requestAxios = axios.create({
	baseURL : process.env.REACT_APP_API,
	headers: {
    'Content-type': 'application/json',
  },
	withCredentials: true
})

export default requestAxios