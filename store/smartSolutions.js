import api from '@/api'

export default {
	actions: {
		async ListSmartSolutions(_, option) {
			const response = await this.$axios({
				method: 'GET',
				url: api.ListSmartSolutions,
				params: {
					length: 5,
					...option,
				},
			})
			return response.data
		},
		async GetSmartSolutionDetail(_, SolutionId) {
			const response = await this.$axios({
				method: 'GET',
				url: api.params('GetSmartSolutions', { id: SolutionId }),
			})
			return response.data
		},
	},
}
