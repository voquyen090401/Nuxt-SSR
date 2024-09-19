import api from '@/api'

export default {
    actions: {
        async ListFreqAskedQuestions(_, options) {
            const response = await this.$axios({
                method: 'GET',
                url: api.ListFreqAskedQuestions,
                params: options
            })
            return response.data;
        },
        async CreateFeedbacks(_, entry) {
            const response = await this.$axios({
                method: 'POST',
                url: api.CreateFeedbacks,
                data: entry
            })
            return response.data;
        },
        async ListVideoTutorials() {
            const response = await this.$axios({
                method: 'GET',
                url: api.ListVideoTutorials,
            })
            return response.data
        }
    }
}