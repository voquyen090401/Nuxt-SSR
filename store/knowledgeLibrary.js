import axios from 'axios'
import api from '@/api'
export default {
	actions: {
		async ListknowledgeLibrary(_, options = {}) {
			const { type, category } = options
			options = {
				...options,
				'category-id': options['category-id'] ?? category ?? 1,
			}
			let response
			if (+type === 2) {
				response = await this.$axios({
					method: 'GET',
					url: api.ListknowledgeLibraryVideos,
					params: options,
				})
			} else {
				response = await this.$axios({
					method: 'GET',
					url: api.ListknowledgeLibraryArticles,
					params: options,
				})
			}
			return response.data
		},
		async ListCategoryknowledgeLibrary() {
			let url = process.env.hostCMS + api.ListCategoryknowledgeLibrary
			url = url.replace(process.env.hostApi, '')
			const response = await axios({
				method: 'GET',
				url,
			})
			return response.data
		},
		async GetknowledgeLibraryArticle(_, id) {
			if (id === undefined) return
			const response = await this.$axios({
				method: 'GET',
				url: api.params('GetknowledgeLibraryArticle', { id }),
			})
			return response.data
		},
		async GetknowledgeLibraryVideo(_, id) {
			if (id === undefined) return
			const response = await this.$axios({
				method: 'GET',
				url: api.params('GetknowledgeLibraryVideo', { id }),
			})
			return response.data
		},
	},
}
