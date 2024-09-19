import api from '@/api'
export default {
	actions: {
		async ListMenu() {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListMenu,
			})
			return response.data
		},
	},
}
