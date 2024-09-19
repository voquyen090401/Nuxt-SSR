import api from '@/api'
export default {
	actions: {
		async ListBanners() {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListBanners,
			})
			return response.data
		},
	},
}
