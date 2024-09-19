import api from '@/api'

export default {
	actions: {
		async ListServiceManagements(_, options) {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListServiceManagements,
				params: options,
			})
			return response.data
		},
	},
}
