<template>
	<div>
		<div class="mb-4">
			<filter-knowledge-library @update:api="updateQuery" />
		</div>
		<knowledge-library-content />
	</div>
</template>

<script>
import FilterKnowledgeLibrary from './partials/filter-knowledge-library.vue'
import KnowledgeLibraryContent from './partials/knowledge-library-content.vue'
export default {
	name: 'ThuVienKienThuc',
	components: {
		FilterKnowledgeLibrary,
		KnowledgeLibraryContent,
	},
	head() {
		return {
			title: ` ${this.$store.state.location.location.name} - Thư viện kiến thức`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ` ${this.$store.state.location.location.name} - Thư viện kiến thức`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: ` ${this.$store.state.location.location.name} - Thư viện kiến thức` },
			],
		}
	},
	methods: {
		updateQuery(query) {
			this.$router.push({ name: this.$route.name, query })
		},
	},
}
</script>
