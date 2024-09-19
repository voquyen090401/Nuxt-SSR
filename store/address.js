import api from '@/api'
export default {
	actions: {
		async ListProvinces() {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListProvinces,
			})
			return response.data
		},
		async ListDistricts(_, id) {
			const params = {
				province: id,
			}
			const response = await this.$axios({
				method: 'GET',
				url: api.ListDistricts,
				params,
			})
			return response.data
		},
		async ListWards(_, id) {
			const params = {
				district: id,
			}
			const response = await this.$axios({
				method: 'GET',
				url: api.ListWards,
				params,
			})
			return response.data
		},
	},
}
