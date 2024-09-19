<template>
    <div>
        <div v-if="$route.query.type == 1">
            <h3 class="text-[#4f4f4f] text-[26px] font-inter font-medium mb-2">
                {{ entry.title }}
            </h3>
            <div class="mb-2 text-[#4f4f4f]">
                <span>{{ $filters.dateTime(entry.created_at) }}</span>
            </div>
            <div v-html="entry.content"></div>
        </div>
        <div v-else>
            <div class="max-h-full h-[400px]">
                <iframe title="thumbnail" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true"
                    mozallowfullscreen="true" class="border" width="100%" height="100%"
                    :src="getSrcYoutube(entry.link)">
                </iframe>
            </div>
            <h3 class="text-[#4f4f4f] text-[26px] font-inter font-medium mb-2">
                {{ entry.title }}
            </h3>
            <div class="mb-2 text-[#4f4f4f]">
                <span>{{ $filters.dateTime(entry.created_at) }}</span>
            </div>
            <div class="text-justify text-[#4f4f4f]" v-html="entry.description"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChiTiet',
    data() {
        return {
            entry: {
                title: '',
                content: '',
            },
            entries: [],
        }
    },
    async fetch() {
        await this.getDetail()
        this.getData()
    },
    head() {
		return {
			title: `${this.entry.title}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.entry.title}`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: `${this.entry.title}` },
			],
		}
	},
    watch: {
        '$route.params.id': {
            async handler() {
                await this.getDetail()
                this.getData()
            },
        },
    },
    methods: {
        getSrcYoutube(url) {
            const newUrl = url || ''
            const regExp =
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
            const match = newUrl.match(regExp)
            const ID = match && match[2].length === 11 ? match[2] : null
            return 'https://www.youtube.com/embed/' + ID + '?autoPlay=0'
        },
        async getDetail() {
            let response
            if (+this.$route.query.type === 1) {
                response = await this.$store.dispatch(
                    'knowledgeLibrary/GetknowledgeLibraryArticle',
                    this.$route.params.id
                )
            } else {
                response = await this.$store.dispatch(
                    'knowledgeLibrary/GetknowledgeLibraryVideo',
                    this.$route.params.id
                )
            }
            this.entry = response.data.entry
        },
        async getData() {
            const response = await this.$store.dispatch('knowledgeLibrary/ListknowledgeLibrary', this.$route.query)
            this.entries = response.data.entries.filter(e => +e.id !== +this.$route.params.id)
        },
    },
}
</script>

<style>