const globalApi = ['/api/web/article-category']

function isGlobalApi(url) {
	return globalApi.includes(url.replace(process.env.hostApi, ''))
}

export default function ({ $axios, store }) {
	$axios.interceptors.request.use(
		(config) => {
			const location = store.state.location.location
			if (location.id !== 0 && !isGlobalApi(config.url)) {
				config.params = {
					...config.params,
					ward: location.id,
				}
				return config
			}
			return config
		},
		(error) => {
			return error
		}
	)

	$axios.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			return error
		}
	)
}
