import axios from 'axios'

const requestAxios = axios.create({
	baseURL : process.env.REACT_APP_API,
	withCredentials: true,
});

export default requestAxios