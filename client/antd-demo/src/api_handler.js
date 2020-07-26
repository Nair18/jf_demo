import constants from './constants';

export default class ApiHandler{
	
	constructor(user_name, option){
		console.log(user_name)
		this.user_name = user_name
		this.option = option
		this.result = []
		this.function_mapper = {
			'followers': this.get_followers(),
			'popular followers': this.get_popular_follower(),
			'repository': this.get_repos()
		}
	}

	route_requests = () => {
		return this.function_mapper[this.option]
	}

	async get_repos() {
		console.log("not here")
		// console.log(this.option)
		// console.log(this.user_name)
		const response = await fetch(constants.base_url + `/repos/${this.user_name}/`, {
      		method: 'get',
      		headers: {
        		'Accept': 'application/json',
        		'Content-Type': 'application/json'
      		}
      	})
      	return response.json()
    }


	async get_followers() {
		console.log(this.option)
		console.log(this.user_name)
		const response = await fetch(constants.base_url + `/followers/${this.user_name}/`, {
      		method: 'get',
      		headers: {
        		'Accept': 'application/json',
        		'Content-Type': 'application/json'
      		}
      	})
      	return response.json()
	}

	async get_popular_follower() {
		console.log("here i am")
		console.log(this.option)
		console.log(this.user_name)
		const response = await fetch(constants.base_url + `/popular_follower/${this.user_name}/`, {
      		method: 'get',
      		headers: {
        		'Accept': 'application/json',
        		'Content-Type': 'application/json'
      		}
      	})
      	console.log(response)
      	return response.json()
	}
}


