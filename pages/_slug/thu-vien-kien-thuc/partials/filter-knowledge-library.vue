<template>
	<div class="flex flex-col sm:flex-row align-items-end gap-2">
		<div class="mr-2">
			<select v-model="type" class="type-select">
				<option :value="1">Bài viết</option>
				<option :value="2">Video</option>
			</select>
		</div>
		<div class="category flex-1">
			<div
				@click="updateCategory(c)"
				v-for="(c, index) in categories"
				:key="index"
				class="category__name"
				:class="{ 'category__name--selected': category == c.id }"
			>
				{{ c.name }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			type: 1,
			category: null,
			categories: [],
		}
	},
	watch: {
		type: {
			handler() {
				this.$emit('update:api', {
					type: this.type,
					category: this.category,
				})
			},
			deep: true,
		},
		category: {
			handler() {
				this.$emit('update:api', {
					type: this.type,
					category: this.category,
				})
			},
			deep: true,
		},
	},
	methods: {
		async getListCategories() {
			const response = await this.$store.dispatch(
				'knowledgeLibrary/ListCategoryknowledgeLibrary'
			)
			this.categories = response.data.entries
		},
		updateCategory(c) {
			this.category = c.id
		},
	},
	created() {
		const { type, category } = this.$route.query
		this.type = type ?? 1
		this.category = category ?? 1
		this.getListCategories()
	},
}
</script>

<style scoped>
.type-select {
	padding: 10px 12px;
	outline: none;
	background-color: #f8f9fa;
	border-radius: 4px;
	border-color: #fff;
	border-right: 10px solid transparent;
}
.category {
	display: flex;
	border-bottom: 2px solid #e2e2e2;
	overflow-x: auto;
}
.category .category__name {
	border-left: 2px solid #e2e2e2;
}
.category__name {
	white-space: nowrap;
	padding: 6px 12px;
	cursor: pointer;
}
.category__name--selected {
	background-color: #44b97c;
	color: white;
}
.mr-2 {
	margin-right: 2rem;
}
</style>
