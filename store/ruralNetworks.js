import api from '@/api'
export default {
	actions: {
		async ListRuralNetworks() {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListRuralNetworks,
				params: { length: 10000 },
			})
			return response.data
		},
	},
}
