import axios from "axios"
import {getToken} from "./credentialManager";
import {API_BASE_URL} from "@env"

const request = axios.create({
	baseURL: API_BASE_URL,
})

export async function apiRequest(method, route, req){

	const token = await getToken()
	const pureToken = token.replace(/['"]+/g, '')

	return new Promise( async (resolve, reject)=>{
		switch(method){

			case "get":
				request.get(route, Object.assign({
					headers: { Authorization: `Bearer ` + pureToken},
				}, req))
					.then(res => {
						resolve(res.data)
					}, rej=> {
						reject(rej)
					})
				break

			case "post":
				request.post(route, req, {headers: { Authorization: `Bearer ` + pureToken}})
					.then(res => {
						resolve(res.data)
					}, rej=> {
						reject(rej)
					})
				break

			case "put":
				request.put(route,req, {headers: { Authorization: `Bearer ` + pureToken}})
					.then(res => {
						resolve(res.data)
					}, rej=> {
						reject(rej)
					})
				break
		}
	})
}
