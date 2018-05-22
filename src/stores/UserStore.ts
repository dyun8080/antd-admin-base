// import { observable } from 'mobx'
import axios from 'axios'

export class UserStore {
	access_token: string

	constructor() {
		this.access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY5MTczMTEsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiZndhcGlfYmFzZSJdLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOX1VTRVIiXSwianRpIjoiNTE5M2ViNmMtODNkZi00NGUyLTg5NWYtNWI0MTZmZmNiYmMyIiwiY2xpZW50X2lkIjoiVHh4R2pZWkNBVWJRZ3hpcEt6V1p0anZZdWdHR29RZFZJWVNVU3ZBaHFLV1BsV055cWRaU09PSU1WY1VKUUxGdyJ9.4NTA3FbOLxmOggGpAmD003igJ82JVARhbbKSSXn0u9w'

		axios.defaults.params = {
			access_token: this.access_token,
		}
	}

}

export default UserStore
