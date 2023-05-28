import { AuthProvider } from "react-admin";

const apiUrl = process.env.REACT_APP_API_URL;

const authProvider: AuthProvider = {
	login: ({ username, password }) =>  {
		const request = new Request(`${apiUrl}/login`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
		.then(response => {
			if (response.status < 200 || response.status >= 300) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(auth => {
			localStorage.setItem('access-token', `Bearer ${ auth.access_token }`);
		})
		.catch(() => {
			throw new Error('Network error')
		});
	},
	logout: () => {
		localStorage.removeItem('access-token');
		return Promise.resolve();
	},
	checkAuth: () =>
		localStorage.getItem('access-token') ? Promise.resolve() : Promise.reject(),
	checkError:  (error) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('access-token');
			return Promise.reject();
		}
		// other error code (404, 500, etc): no need to log out
		return Promise.resolve();
	},
	getIdentity: () =>
		Promise.resolve({
			id: 'user',
			fullName: 'John Doe',
		}),
	getPermissions: () => Promise.resolve(''),
};

export default authProvider;