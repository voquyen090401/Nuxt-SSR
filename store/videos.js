import api from '@/api'
export default {
	actions: {
		async ListVideos(_, params) {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListVideos,
				params: { ...params, length: 9 },
			})
			return response.data
		},
	},
}
