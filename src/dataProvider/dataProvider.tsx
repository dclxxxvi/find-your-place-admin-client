import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;
const httpClient = (url: string, options: any = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' });
	}
	const token = localStorage.getItem('access-token') || '';
	options.headers.set('Authorization', `${token}`);
	return fetchUtils.fetchJson(url, options);
};

const dataProvider: DataProvider = {
	getList: (resource, params) => {
		const { page, perPage } = params.pagination;
		const query = {
			page,
			size: perPage,
		};
		const url = `${apiUrl}/service/workspaces?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			console.log(json)
			return ({
				data: json.data.items,
				total: json.data.total,
			});
		});
	},

	getOne: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
			data: json.data,
		})),

	getMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ ids: params.ids }),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			}),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => ({
			data: json,
			// total: parseInt(headers.get('content-range').split('/').pop(), 10),
		}));
	},

	create: (resource, params) =>
		httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		})),

	update: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json })),

	updateMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids}),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},

	delete: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json })),

	deleteMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids}),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'DELETE',
			// body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},
};

export default dataProvider;