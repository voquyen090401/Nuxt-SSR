import api from '@/api'

export default {
	actions: {
		async ListRuralServices() {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListRuralServices,
			})
			return response.data
		},
		async GetRuralService(_, ServicesId) {
			const response = await this.$axios({
				method: 'GET',
				url: api.params('GetRuralService', { id: ServicesId }),
			})
			return response.data
		},
	},
}
