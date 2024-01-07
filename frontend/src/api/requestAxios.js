import axios from 'axios'

const requestAxios = axios.create({
	baseURL : process.env.REACT_APP_API,
	// headers: {
  //   'Content-type': 'application/json',
	// 	'Access-Control-Allow-Origin' : '*',
	// 	'Access-Control-Allow-Methods' : '*'
  // },
	withCredentials: true
})

export default requestAxios